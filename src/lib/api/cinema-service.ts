import type {
  Movie,
  ComingSoonMovie,
  CinemaInfo,
  GalleryItem,
  ShowDate,
  Showtime,
  ExperienceFeature,
  ScreenDetail,
  LegacyMilestone,
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
// EVM Cinema Service Abstraction Layer
// =============================================================================

/**
 * Fetch all currently showing movies.
 */
export async function getNowShowingMovies(
  languageFilter?: string
): Promise<Movie[]> {
  await new Promise((res) => setTimeout(res, 30));
  if (languageFilter && languageFilter !== 'ALL') {
    return nowShowingMovies.filter(
      (m) => m.language.toUpperCase() === languageFilter.toUpperCase()
    );
  }
  return nowShowingMovies;
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
 */
export async function getShowtimesForMovieAndDate(
  movieId: string,
  date: string
): Promise<Showtime[]> {
  await new Promise((res) => setTimeout(res, 20));
  const movieSchedule = mockMovieShowtimes[movieId];
  if (!movieSchedule) return [];
  return movieSchedule[date] || movieSchedule['2026-10-17'] || Object.values(movieSchedule)[0] || [];
}

/**
 * Fetch all upcoming / coming soon movies.
 */
export async function getComingSoonMovies(): Promise<ComingSoonMovie[]> {
  await new Promise((res) => setTimeout(res, 30));
  return comingSoonMovies;
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
 * Easily swappable to an external URL or live booking flow when the client is ready.
 */
export function getBookingUrl(showtimeOrMovieId?: string): string {
  if (showtimeOrMovieId) {
    return `/booking?ref=${encodeURIComponent(showtimeOrMovieId)}`;
  }
  return '/booking';
}
