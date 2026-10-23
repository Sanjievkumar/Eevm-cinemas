import type {
  Movie,
  ComingSoonMovie,
  CinemaInfo,
  GalleryItem,
  Showtime,
  ExperienceFeature,
  ScreenDetail,
  LegacyMilestone,
  Language,
  CertificateRating,
  MovieStatus,
  ScreenFormat,
} from '@/types';
import {
  nowShowingMovies,
  comingSoonMovies,
  cinemaInfo,
  galleryItems,
  mockAvailableDates,
  mockMovieShowtimes,
  experienceFeatures,
  screenDetails,
  legacyMilestones,
} from '@/lib/data/mock-data';

// =============================================================================
// Published Google Sheet Configuration
// =============================================================================

export const GOOGLE_SHEET_CSV_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vTk8TnMcyjxvTfdyItx2YNUdPMRjRVM5pJ38hHGMXqqvAworwSKyeYU7paxUvprJv52KO-aCRGcepCd/pub?output=csv';

// In-memory cache for parsed Google Sheet movie data to prevent duplicate fetches
interface CachedSheetData {
  timestamp: number;
  movies: Movie[];
  comingSoon: ComingSoonMovie[];
}

let sheetCache: CachedSheetData | null = null;
let sheetFetchPromise: Promise<{ movies: Movie[]; comingSoon: ComingSoonMovie[] }> | null = null;
const CACHE_TTL_MS = 5 * 1000; // 5 seconds cache for fast updates

// =============================================================================
// RFC 4180 Compliant CSV Parser
// Handles quotes, commas inside descriptions/cells, escaped quotes, newlines
// =============================================================================

export function parseCSV(text: string): string[][] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentVal = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (inQuotes) {
      if (char === '"' && nextChar === '"') {
        currentVal += '"';
        i++; // skip next escaped quote
      } else if (char === '"') {
        inQuotes = false;
      } else {
        currentVal += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ',') {
        currentRow.push(currentVal.trim());
        currentVal = '';
      } else if (char === '\r') {
        if (nextChar === '\n') i++;
        currentRow.push(currentVal.trim());
        rows.push(currentRow);
        currentRow = [];
        currentVal = '';
      } else if (char === '\n') {
        currentRow.push(currentVal.trim());
        rows.push(currentRow);
        currentRow = [];
        currentVal = '';
      } else {
        currentVal += char;
      }
    }
  }

  // Push final cell and row if text didn't end with a newline
  if (currentVal.trim() !== '' || currentRow.length > 0) {
    currentRow.push(currentVal.trim());
    rows.push(currentRow);
  }

  return rows;
}

// =============================================================================
// Field Mapping & Normalization Utilities
// =============================================================================

/**
 * Format Google Drive and web URLs for reliable image rendering.
 * Converts Google Drive viewer URLs to direct thumbnail / content CDN links.
 */
export function formatPosterUrl(rawUrl: string | undefined | null): string {
  if (!rawUrl || typeof rawUrl !== 'string') return '';
  const url = rawUrl.trim();
  if (!url) return '';

  // 1. Match Google Drive file ID: /file/d/{id}
  const driveFileMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (driveFileMatch && driveFileMatch[1]) {
    return `https://lh3.googleusercontent.com/d/${driveFileMatch[1]}`;
  }

  // 2. Match Google Drive ID query param: ?id={id} or &id={id}
  const driveIdParamMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (driveIdParamMatch && driveIdParamMatch[1] && url.includes('drive.google.com')) {
    return `https://lh3.googleusercontent.com/d/${driveIdParamMatch[1]}`;
  }

  // 3. Match Google Drive direct d/{id}
  const driveDirectMatch = url.match(/drive\.google\.com\/d\/([a-zA-Z0-9_-]+)/);
  if (driveDirectMatch && driveDirectMatch[1]) {
    return `https://lh3.googleusercontent.com/d/${driveDirectMatch[1]}`;
  }

  return url;
}

/**
 * Parse runtime strings into total minutes.
 * Handles: "2HRS 31mins", "2h 31m", "151 mins", "151", "2:31".
 */
export function parseRuntimeToMinutes(val: string | number | undefined | null): number {
  if (typeof val === 'number') return isNaN(val) ? 120 : Math.max(1, Math.round(val));
  if (!val) return 120;
  const str = String(val).trim();

  // Pattern 1: "2HRS 31mins", "2 hrs 31 mins", "2h 31m"
  const hrMinMatch = str.match(/(?:(\d+)\s*(?:hrs?|hours?|h))?\s*(?:(\d+)\s*(?:mins?|minutes?|m))?/i);
  if (hrMinMatch && (hrMinMatch[1] || hrMinMatch[2])) {
    const hours = hrMinMatch[1] ? parseInt(hrMinMatch[1], 10) : 0;
    const mins = hrMinMatch[2] ? parseInt(hrMinMatch[2], 10) : 0;
    const total = hours * 60 + mins;
    if (total > 0) return total;
  }

  // Pattern 2: "2:31" (HH:MM)
  const colonMatch = str.match(/^(\d+):(\d+)$/);
  if (colonMatch) {
    return parseInt(colonMatch[1], 10) * 60 + parseInt(colonMatch[2], 10);
  }

  // Pattern 3: Pure number or digits followed by text: "151", "151 mins"
  const numMatch = str.match(/\d+/);
  if (numMatch) {
    const num = parseInt(numMatch[0], 10);
    return num > 0 ? num : 120;
  }

  return 120;
}

/**
 * Capitalize titles / names cleanly (e.g. "odyssey" -> "Odyssey").
 */
export function formatTitle(title: string | undefined | null): string {
  if (!title) return '';
  const trimmed = title.trim();
  if (!trimmed) return '';
  // Capitalize word beginnings
  return trimmed.replace(/\b\w/g, (char) => char.toUpperCase());
}

/**
 * Create a URL-safe slug from a title.
 */
export function slugify(text: string | undefined | null): string {
  if (!text) return 'movie';
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Normalize certificate ratings to 'U' | 'UA' | 'A' | 'S'.
 */
export function parseCertificate(val: string | undefined | null): CertificateRating {
  if (!val) return 'UA';
  const clean = val.trim().toUpperCase().replace(/[^A-Z]/g, '');
  if (clean === 'A') return 'A';
  if (clean === 'UA' || clean === 'U' || clean === 'S') return clean as CertificateRating;
  return 'UA';
}

/**
 * Normalize language to allowed Language union type.
 */
export function parseLanguage(val: string | undefined | null): Language {
  if (!val) return 'English';
  const clean = val.trim().toLowerCase();
  if (clean.includes('tamil')) return 'Tamil';
  if (clean.includes('english')) return 'English';
  if (clean.includes('hindi')) return 'Hindi';
  if (clean.includes('telugu')) return 'Telugu';
  if (clean.includes('malayalam')) return 'Malayalam';
  if (clean.includes('kannada')) return 'Kannada';
  return 'English';
}

/**
 * Split and format genres array (e.g. "action, thriller" -> ["Action", "Thriller"]).
 */
export function parseGenres(val: string | undefined | null): string[] {
  if (!val) return ['Feature Film'];
  const split = val.split(/[,/]/).map((g) => formatTitle(g.trim())).filter(Boolean);
  return split.length > 0 ? split : ['Feature Film'];
}

/**
 * Split and format cast array (e.g. "tom holland, zendaya" -> ["Tom Holland", "Zendaya"]).
 */
export function parseCast(val: string | undefined | null): string[] {
  if (!val) return [];
  return val.split(/[,;]/).map((c) => formatTitle(c.trim())).filter(Boolean);
}

/**
 * Check if a date string represents an upcoming/future release.
 * Reference cinema calendar date in EVM mock schedules is 2026-10-17.
 */
export function isUpcomingRelease(dateStr: string | undefined | null): boolean {
  if (!dateStr) return false;
  const clean = dateStr.trim().toLowerCase();
  if (clean.includes('coming') || clean.includes('soon') || clean.includes('tba') || clean.includes('upcoming')) {
    return true;
  }

  const parsed = Date.parse(dateStr);
  if (!isNaN(parsed)) {
    // Cinema timeline reference date
    const referenceDate = new Date('2026-10-17T00:00:00Z').getTime();
    return parsed > referenceDate;
  }

  return false;
}

/**
 * Determine MovieStatus from the spreadsheet's actual status value.
 * Spreadsheet status is trimmed and case-insensitive.
 */
export function parseMovieStatus(val: string | undefined | null): MovieStatus {
  if (!val) return 'now_showing';
  const s = val.trim().toLowerCase();

  // Inactive / hidden
  if (
    s === 'inactive' ||
    s.startsWith('inact') ||
    s === 'ended' ||
    s === 'disabled' ||
    s === 'hidden' ||
    s === 'archived' ||
    s === 'closed' ||
    s === 'no' ||
    s === 'false'
  ) {
    return 'ended';
  }

  // Upcoming / coming soon
  if (s.includes('coming') || s.includes('upcoming') || s.includes('soon')) {
    return 'coming_soon';
  }

  // Active
  return 'now_showing';
}

// =============================================================================
// Fetch & Parse Google Sheet Data
// =============================================================================

/**
 * Fetches and parses movie records from the published Google Sheet CSV.
 * Uses the exact spreadsheet headers:
 * movie_id, title, poster_url, status, language, genre, certificate, runtime_minutes, director, cast, release_date, synopsis, website_order
 *
 * Rules:
 * 1. Filter by status column: show only Active movies.
 * 2. Inactive movies ('inactive') are completely hidden from Now Showing and Coming Soon.
 * 3. Fall back to mock data only if the CSV request fails.
 */
export async function fetchMoviesFromGoogleSheet(): Promise<{
  movies: Movie[];
  comingSoon: ComingSoonMovie[];
}> {
  // Check in-memory cache
  if (sheetCache && Date.now() - sheetCache.timestamp < CACHE_TTL_MS) {
    return { movies: sheetCache.movies, comingSoon: sheetCache.comingSoon };
  }

  // Deduplicate concurrent in-flight requests
  if (sheetFetchPromise) {
    return sheetFetchPromise;
  }

  sheetFetchPromise = (async () => {
    try {
      const urlWithBuster = `${GOOGLE_SHEET_CSV_URL}&_cb=${Date.now()}`;
      const res = await fetch(urlWithBuster, {
        cache: 'no-store',
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch Google Sheet CSV: HTTP ${res.status} ${res.statusText}`);
      }

      const csvText = await res.text();
      if (!csvText || !csvText.trim()) {
        throw new Error('Google Sheet CSV returned empty response');
      }

      const rows = parseCSV(csvText);
      if (rows.length < 2) {
        throw new Error('Google Sheet CSV has no data rows');
      }

      // Map header indices
      const headers = rows[0].map((h) => h.toLowerCase().trim());
      const getIndex = (name: string) => headers.indexOf(name);

      const idIdx = getIndex('movie_id');
      const titleIdx = getIndex('title');
      const posterIdx = getIndex('poster_url');
      const statusIdx = getIndex('status');
      const langIdx = getIndex('language');
      const genreIdx = getIndex('genre');
      const certIdx = getIndex('certificate');
      const runtimeIdx = getIndex('runtime_minutes');
      const directorIdx = getIndex('director');
      const castIdx = getIndex('cast');
      const releaseDateIdx = getIndex('release_date');
      const synopsisIdx = getIndex('synopsis');
      const orderIdx = getIndex('website_order');

      const activeMovies: { movie: Movie; order: number }[] = [];
      const comingSoonList: { movie: ComingSoonMovie; order: number }[] = [];

      for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        if (!row || row.length === 0 || (row.length === 1 && !row[0])) continue;

        const rawTitle = titleIdx !== -1 ? row[titleIdx] : '';
        if (!rawTitle) continue;

        const rawStatus = (statusIdx !== -1 && row[statusIdx] ? row[statusIdx] : 'active').trim().toLowerCase();

        // STRICT STATUS FILTER: Hide Inactive movies from both Now Showing and Coming Soon
        const isInactive =
          rawStatus === 'inactive' ||
          rawStatus.startsWith('inact') ||
          rawStatus === 'ended' ||
          rawStatus === 'disabled' ||
          rawStatus === 'hidden' ||
          rawStatus === 'archived' ||
          rawStatus === 'closed' ||
          rawStatus === 'false' ||
          rawStatus === 'no';

        if (isInactive) {
          // Skip completely — movie is not shown in Now Showing or Coming Soon
          continue;
        }

        const rawId = idIdx !== -1 && row[idIdx] ? row[idIdx] : String(i);
        const title = formatTitle(rawTitle);
        const slug = slugify(title) || `movie-${rawId}`;
        const posterUrl = formatPosterUrl(posterIdx !== -1 ? row[posterIdx] : '');
        const language = parseLanguage(langIdx !== -1 ? row[langIdx] : '');
        const genres = parseGenres(genreIdx !== -1 ? row[genreIdx] : '');
        const certificate = parseCertificate(certIdx !== -1 ? row[certIdx] : '');
        const duration = parseRuntimeToMinutes(runtimeIdx !== -1 ? row[runtimeIdx] : '');
        const director = formatTitle(directorIdx !== -1 ? row[directorIdx] : 'EVM Cinemas');
        const cast = parseCast(castIdx !== -1 ? row[castIdx] : '');
        const releaseDate = releaseDateIdx !== -1 && row[releaseDateIdx] ? row[releaseDateIdx].trim() : 'Coming Soon';
        const synopsis = synopsisIdx !== -1 && row[synopsisIdx] ? row[synopsisIdx].trim() : 'Experience world-class cinema at EVM Cinemas.';
        const order = orderIdx !== -1 && row[orderIdx] ? parseInt(row[orderIdx], 10) || i : i;

        // Formats for EVM Cinemas screens
        const formats: ScreenFormat[] = ['Dolby Cinema', 'Dolby Atmos'];

        const isExplicitComingSoon = rawStatus.includes('coming') || rawStatus.includes('upcoming') || rawStatus.includes('soon');
        const isUpcoming = isExplicitComingSoon || isUpcomingRelease(releaseDate);

        // Populate Coming Soon if explicitly upcoming or future release date
        if (isUpcoming) {
          comingSoonList.push({
            movie: {
              id: String(rawId),
              title,
              slug,
              language,
              genres,
              certificate,
              posterUrl,
              bannerUrl: posterUrl,
              synopsis,
              releaseDate,
              formats,
              isNotifyEnabled: true,
            },
            order,
          });
        }

        // Populate Now Showing for active movies (unless marked explicitly as coming soon)
        if (!isExplicitComingSoon) {
          activeMovies.push({
            movie: {
              id: String(rawId),
              title,
              slug,
              language,
              genres,
              duration,
              certificate,
              posterUrl,
              bannerUrl: posterUrl,
              synopsis,
              cast,
              director,
              releaseDate,
              status: 'now_showing',
              rating: 8.5,
              formats,
            },
            order,
          });
        }
      }

      // Sort by website_order
      activeMovies.sort((a, b) => a.order - b.order);
      comingSoonList.sort((a, b) => a.order - b.order);

      const parsedMovies = activeMovies.map((item) => item.movie);
      const parsedComingSoon = comingSoonList.map((item) => item.movie);

      // Save to cache
      sheetCache = {
        timestamp: Date.now(),
        movies: parsedMovies,
        comingSoon: parsedComingSoon,
      };

      return { movies: parsedMovies, comingSoon: parsedComingSoon };
    } catch (err) {
      console.warn('Unable to load movie data from Google Sheet, using mock data fallback:', err);
      // Fallback to mock data ONLY if the CSV request fails
      return {
        movies: nowShowingMovies,
        comingSoon: comingSoonMovies,
      };
    } finally {
      sheetFetchPromise = null;
    }
  })();

  return sheetFetchPromise;
}

// =============================================================================
// EVM Cinema Service Public API
// =============================================================================

/**
 * Fetch all currently showing movies.
 * Source of truth: Published Google Sheet CSV (with mock fallback only on request failure).
 */
export async function getNowShowingMovies(
  languageFilter?: string
): Promise<Movie[]> {
  const { movies } = await fetchMoviesFromGoogleSheet();

  if (languageFilter && languageFilter !== 'ALL') {
    return movies.filter(
      (m) => m.language.toUpperCase() === languageFilter.toUpperCase()
    );
  }

  return movies;
}

/**
 * Fetch all upcoming / coming soon movies.
 * Source of truth: Published Google Sheet CSV (with mock fallback only on request failure).
 */
export async function getComingSoonMovies(): Promise<ComingSoonMovie[]> {
  const { comingSoon } = await fetchMoviesFromGoogleSheet();
  return comingSoon;
}

/**
 * Fetch available dates for showtime selection.
 */
export async function getAvailableShowDates(): Promise<
  { date: string; dayLabel: string; monthLabel: string }[]
> {
  await new Promise((res) => setTimeout(res, 20));
  return mockAvailableDates;
}

/**
 * Fetch showtimes for a specific movie on a specific date.
 * If exact showtimes exist in mock schedules, uses them;
 * otherwise generates realistic EVM Cinemas showtimes across Screen 1 & Screen 2.
 */
export async function getShowtimesForMovieAndDate(
  movieId: string,
  date: string
): Promise<Showtime[]> {
  await new Promise((res) => setTimeout(res, 20));

  const movieSchedule = mockMovieShowtimes[movieId];
  if (movieSchedule) {
    return movieSchedule[date] || movieSchedule['2026-10-17'] || Object.values(movieSchedule)[0] || [];
  }

  // Authentic showtime schedule for EVM Cinemas screens
  return [
    {
      id: `st-${movieId}-01`,
      movieId,
      screenId: 'screen-1',
      time: '11:00 AM',
      format: 'Dolby Cinema',
      language: 'English',
      bookingUrl: getBookingUrl(movieId),
    },
    {
      id: `st-${movieId}-02`,
      movieId,
      screenId: 'screen-1',
      time: '02:30 PM',
      format: 'Dolby Atmos',
      language: 'English',
      bookingUrl: getBookingUrl(movieId),
      isAlmostFull: true,
    },
    {
      id: `st-${movieId}-03`,
      movieId,
      screenId: 'screen-2',
      time: '06:15 PM',
      format: '4K',
      language: 'English',
      bookingUrl: getBookingUrl(movieId),
    },
    {
      id: `st-${movieId}-04`,
      movieId,
      screenId: 'screen-1',
      time: '09:45 PM',
      format: 'Dolby Cinema',
      language: 'English',
      bookingUrl: getBookingUrl(movieId),
    },
  ];
}

/**
 * Find a movie by ID or reference token (used for booking references).
 */
export async function getMovieById(idOrRef: string): Promise<Movie | null> {
  const { movies } = await fetchMoviesFromGoogleSheet();
  const cleanRef = idOrRef.trim().toLowerCase();

  const found = movies.find(
    (m) =>
      m.id.toLowerCase() === cleanRef ||
      m.title.toLowerCase() === cleanRef ||
      cleanRef.startsWith(m.id.toLowerCase()) ||
      cleanRef.startsWith(`st-${m.id.toLowerCase()}`)
  );

  return found || null;
}

/**
 * Fetch experience features ("More Than A Movie").
 */
export async function getExperienceFeatures(): Promise<ExperienceFeature[]> {
  await new Promise((res) => setTimeout(res, 20));
  return experienceFeatures;
}

/**
 * Fetch screen auditorium details ("Two Screens").
 */
export async function getScreenDetails(): Promise<ScreenDetail[]> {
  await new Promise((res) => setTimeout(res, 20));
  return screenDetails;
}

/**
 * Fetch legacy history milestones ("Our Legacy").
 */
export async function getLegacyMilestones(): Promise<LegacyMilestone[]> {
  await new Promise((res) => setTimeout(res, 20));
  return legacyMilestones;
}

/**
 * Fetch cinema/location information.
 */
export async function getCinemaInfo(): Promise<CinemaInfo> {
  return cinemaInfo;
}

/**
 * Fetch gallery items, optionally filtered by category.
 */
export async function getGalleryItems(
  category?: string
): Promise<GalleryItem[]> {
  await new Promise((res) => setTimeout(res, 30));
  if (category) {
    return galleryItems.filter((item) => item.category === category);
  }
  return galleryItems;
}

/**
 * Internal route for online movie booking.
 * Directs users to the internal /booking Coming Soon page until online ticket booking goes live.
 */
export function getBookingUrl(showtimeOrMovieId?: string): string {
  if (showtimeOrMovieId) {
    return `/booking?ref=${encodeURIComponent(showtimeOrMovieId)}`;
  }
  return '/booking';
}
