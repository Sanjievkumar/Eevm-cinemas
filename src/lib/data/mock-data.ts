import type {
  Movie,
  ComingSoonMovie,
  CinemaInfo,
  GalleryItem,
  ShowDate,
  NavItem,
  HomepageSection,
  Showtime,
  ExperienceFeature,
  ScreenDetail,
  LegacyMilestone,
} from '@/types';

// =============================================================================
// Navigation — EVM Cinemas Public Site
// =============================================================================

export const navigationItems: NavItem[] = [
  { label: 'Home', href: '/#hero' },
  { label: 'Now Showing', href: '/#now-showing' },
  { label: 'Coming Soon', href: '/#coming-soon' },
  { label: 'Our Screens', href: '/#screens' },
  { label: 'About', href: '/#about' },
  { label: 'Gallery', href: '/#gallery' },
  { label: 'Contact', href: '/#contact' },
];

// =============================================================================
// Homepage Sections Configuration
// =============================================================================

export const homepageSections: HomepageSection[] = [
  { id: 'hero', label: 'Hero', order: 1 },
  { id: 'now-showing', label: 'Book Your Experience / Now Showing', order: 2 },
  { id: 'coming-soon', label: 'What\'s Playing / Coming Soon', order: 3 },
  { id: 'experience', label: 'More Than a Movie', order: 4 },
  { id: 'screens', label: 'Two Screens', order: 5 },
  { id: 'about', label: 'Our Legacy', order: 6 },
  { id: 'gallery', label: 'Gallery', order: 7 },
  { id: 'contact', label: 'Contact', order: 8 },
];

// =============================================================================
// Cinema Information — EVM Cinemas (Kochi, Keralam)
// =============================================================================

export const cinemaInfo: CinemaInfo = {
  name: 'EVM Cinemas',
  tagline: 'Where Stories Come Alive',
  description: 'A modern cinema experience in Kochi, Keralam.',
  address: 'Opp. EVM Theater, Chullickal',
  city: 'KOCHI',
  state: 'KERALAM',
  pincode: '682005',
  phone: '+91 484 485 7577',
  email: 'info@evmcinemas.com',
  mapUrl: 'https://maps.google.com/?q=Opp.+EVM+Theater,+Chullickal,+Kochi,+Kerala+682005',
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15719.1039818858!2d76.2520!3d9.9455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b086d493a39e877%3A0x6b44a86b360b9432!2sChullickal%2C%20Kochi%2C%20Kerala%20682005!5e0!3m2!1sen!2sin!4v1',
  coordinates: {
    lat: 9.9455,
    lng: 76.2570,
  },
  screens: [
    {
      id: 'screen-1',
      name: 'Screen 1 — Grand',
      capacity: 450,
      formats: ['Dolby Cinema', 'Dolby Atmos'],
      description: 'Our flagship auditorium bringing together dolby vision projection and studio grade dolby atmos sound for an unforgettable viewing experience.',
    },
    {
      id: 'screen-2',
      name: 'Screen 2 — Classic',
      capacity: 155,
      formats: ['4K', 'Dolby Atmos'],
      description: 'A refined viewing environment featuring ultra-sharp 4K laser projection and enveloping Dolby Atmos surround sound.',
    },
  ],
  socialLinks: {
    twitter: 'https://x.com/EVMCinemasKochi',
    instagram: 'https://www.instagram.com/evmcinemasfortkochi/',
    facebook: 'https://www.facebook.com/evmcinemasfortkochi',
    youtube: 'https://www.youtube.com/@evmcinemafortkochi',
  },
  operatingHours: '9:00 AM – 11:30 PM',
};

// =============================================================================
// Available Dates for Scheduling
// =============================================================================

export const mockAvailableDates: { date: string; dayLabel: string; monthLabel: string }[] = [
  { date: '2026-10-07', dayLabel: 'TODAY', monthLabel: '07 OCT' },
  { date: '2026-10-08', dayLabel: 'TOMORROW', monthLabel: '08 OCT' },
  { date: '2026-10-09', dayLabel: 'FRI', monthLabel: '09 OCT' },
  { date: '2026-10-10', dayLabel: 'SAT', monthLabel: '10 OCT' },
  { date: '2026-10-11', dayLabel: 'SUN', monthLabel: '11 OCT' },
];

// =============================================================================
// Movies — Now Showing (Mock Data)
// =============================================================================

export const nowShowingMovies: Movie[] = [
  {
    id: 'mov-001',
    title: 'JAWAN',
    slug: 'jawan',
    language: 'Tamil',
    genres: ['Action', 'Thriller'],
    duration: 169,
    certificate: 'UA',
    posterUrl: '/images/movies/jawan poster.jpg',
    bannerUrl: '/images/movies/jawan-banner.jpg',
    synopsis: 'A high-octane action thriller detailing the journey of a man set out to rectify the wrongs in society.',
    cast: ['Shah Rukh Khan', 'Nayanthara', 'Vijay Sethupathi'],
    director: 'Atlee',
    releaseDate: '2026-10-01',
    status: 'now_showing',
    rating: 8.4,
    formats: ['4K', 'Dolby Atmos'],
  },
  {
    id: 'mov-002',
    title: 'JAILER',
    slug: 'jailer',
    language: 'Tamil',
    genres: ['Action', 'Crime'],
    duration: 168,
    certificate: 'UA',
    posterUrl: '/images/movies/jailer poster.jpg',
    bannerUrl: '/images/movies/jailer-banner.jpg',
    synopsis: 'A retired jailer goes on a rampage to track down his son\'s kidnappers.',
    cast: ['Rajinikanth', 'Mohanlal', 'Shivarajkumar'],
    director: 'Nelson Dilipkumar',
    releaseDate: '2026-09-28',
    status: 'now_showing',
    rating: 8.2,
    formats: ['4K', 'Dolby Cinema'],
  },
  {
    id: 'mov-003',
    title: 'OPPENHEIMER',
    slug: 'oppenheimer',
    language: 'English',
    genres: ['Biography', 'Drama', 'History'],
    duration: 180,
    certificate: 'A',
    posterUrl: '/images/movies/oppenheimer poster.jpg',
    bannerUrl: '/images/movies/oppenheimer-banner.jpg',
    synopsis: 'The story of J. Robert Oppenheimer and the development of the atomic bomb.',
    cast: ['Cillian Murphy', 'Emily Blunt', 'Matt Damon'],
    director: 'Christopher Nolan',
    releaseDate: '2026-07-21',
    status: 'now_showing',
    rating: 8.9,
    formats: ['4K', 'Dolby Cinema'],
  },
  {
    id: 'mov-004',
    title: 'BARBIE',
    slug: 'barbie',
    language: 'English',
    genres: ['Comedy', 'Fantasy'],
    duration: 114,
    certificate: 'UA',
    posterUrl: '/images/movies/barbie poster.jpg',
    bannerUrl: '/images/movies/barbie-banner.jpg',
    synopsis: 'Barbie suffers a crisis that leads her to question her world and her existence.',
    cast: ['Margot Robbie', 'Ryan Gosling'],
    director: 'Greta Gerwig',
    releaseDate: '2026-07-21',
    status: 'now_showing',
    rating: 7.8,
    formats: ['4K'],
  },
  {
    id: 'mov-005',
    title: 'MISSION: IMPOSSIBLE',
    slug: 'mission-impossible-dead-reckoning',
    language: 'English',
    genres: ['Action', 'Adventure'],
    duration: 163,
    certificate: 'UA',
    posterUrl: '/images/movies/mission impossible poster.jpg',
    bannerUrl: '/images/movies/mission-impossible-banner.jpg',
    synopsis: 'Ethan Hunt and his IMF team must track down a dangerous weapon before it falls into the wrong hands.',
    cast: ['Tom Cruise', 'Hayley Atwell'],
    director: 'Christopher McQuarrie',
    releaseDate: '2026-07-12',
    status: 'now_showing',
    rating: 8.1,
    formats: ['4K', 'Dolby Atmos'],
  },
  {
    id: 'mov-006',
    title: 'ANIMAL',
    slug: 'animal',
    language: 'Hindi',
    genres: ['Action', 'Drama'],
    duration: 201,
    certificate: 'A',
    posterUrl: '/images/movies/animal poster.jpg',
    bannerUrl: '/images/movies/animal-banner.jpg',
    synopsis: 'A son\'s ardent love for his father turns into a violent obsession.',
    cast: ['Ranbir Kapoor', 'Rashmika Mandanna', 'Anil Kapoor'],
    director: 'Sandeep Reddy Vanga',
    releaseDate: '2026-12-01',
    status: 'now_showing',
    rating: 7.6,
    formats: ['4K', 'Dolby Atmos'],
  },
];

// =============================================================================
// Mock Showtimes by Movie and Date
// =============================================================================

export const mockMovieShowtimes: Record<string, Record<string, Showtime[]>> = {
  'mov-001': {
    '2026-10-07': [
      { id: 'st-01-01', movieId: 'mov-001', screenId: 'screen-1', time: '11:00 AM', format: '4K', language: 'Tamil', bookingUrl: 'https://in.bookmyshow.com' },
      { id: 'st-01-02', movieId: 'mov-001', screenId: 'screen-1', time: '02:30 PM', format: 'Dolby Atmos', language: 'Tamil', bookingUrl: 'https://in.bookmyshow.com', isAlmostFull: true },
      { id: 'st-01-03', movieId: 'mov-001', screenId: 'screen-2', time: '06:00 PM', format: '4K', language: 'Tamil', bookingUrl: 'https://in.bookmyshow.com' },
      { id: 'st-01-04', movieId: 'mov-001', screenId: 'screen-1', time: '09:30 PM', format: 'Dolby Atmos', language: 'Tamil', bookingUrl: 'https://in.bookmyshow.com' },
    ],
  },
  'mov-002': {
    '2026-10-07': [
      { id: 'st-02-01', movieId: 'mov-002', screenId: 'screen-2', time: '10:30 AM', format: '4K', language: 'Tamil', bookingUrl: 'https://in.bookmyshow.com' },
      { id: 'st-02-02', movieId: 'mov-002', screenId: 'screen-1', time: '01:45 PM', format: 'Dolby Cinema', language: 'Tamil', bookingUrl: 'https://in.bookmyshow.com' },
      { id: 'st-02-03', movieId: 'mov-002', screenId: 'screen-2', time: '05:15 PM', format: 'Dolby Atmos', language: 'Tamil', bookingUrl: 'https://in.bookmyshow.com', isAlmostFull: true },
      { id: 'st-02-04', movieId: 'mov-002', screenId: 'screen-2', time: '08:45 PM', format: '4K', language: 'Tamil', bookingUrl: 'https://in.bookmyshow.com' },
    ],
  },
  'mov-003': {
    '2026-10-07': [
      { id: 'st-03-01', movieId: 'mov-003', screenId: 'screen-1', time: '11:30 AM', format: 'Dolby Cinema', language: 'English', bookingUrl: 'https://in.bookmyshow.com' },
      { id: 'st-03-02', movieId: 'mov-003', screenId: 'screen-1', time: '03:00 PM', format: 'Dolby Cinema', language: 'English', bookingUrl: 'https://in.bookmyshow.com' },
      { id: 'st-03-03', movieId: 'mov-003', screenId: 'screen-1', time: '06:45 PM', format: 'Dolby Cinema', language: 'English', bookingUrl: 'https://in.bookmyshow.com' },
    ],
  },
  'mov-004': {
    '2026-10-07': [
      { id: 'st-04-01', movieId: 'mov-004', screenId: 'screen-2', time: '12:00 PM', format: '4K', language: 'English', bookingUrl: 'https://in.bookmyshow.com' },
      { id: 'st-04-02', movieId: 'mov-004', screenId: 'screen-2', time: '04:30 PM', format: '4K', language: 'English', bookingUrl: 'https://in.bookmyshow.com' },
    ],
  },
  'mov-005': {
    '2026-10-07': [
      { id: 'st-05-01', movieId: 'mov-005', screenId: 'screen-2', time: '02:15 PM', format: 'Dolby Atmos', language: 'English', bookingUrl: 'https://in.bookmyshow.com' },
      { id: 'st-05-02', movieId: 'mov-005', screenId: 'screen-2', time: '09:00 PM', format: 'Dolby Atmos', language: 'English', bookingUrl: 'https://in.bookmyshow.com' },
    ],
  },
  'mov-006': {
    '2026-10-07': [
      { id: 'st-06-01', movieId: 'mov-006', screenId: 'screen-1', time: '10:45 AM', format: '4K', language: 'Hindi', bookingUrl: 'https://in.bookmyshow.com' },
      { id: 'st-06-02', movieId: 'mov-006', screenId: 'screen-2', time: '06:15 PM', format: 'Dolby Atmos', language: 'Hindi', bookingUrl: 'https://in.bookmyshow.com' },
    ],
  },
};

// =============================================================================
// Movies — Coming Soon (Page 3 of Mockup)
// =============================================================================

export const comingSoonMovies: ComingSoonMovie[] = [
  {
    id: 'cs-001',
    title: 'PUSHPA 2: THE RULE',
    slug: 'pushpa-2',
    language: 'Telugu',
    genres: ['Action', 'Drama'],
    certificate: 'UA',
    posterUrl: '/images/movies/pushpa2 poster.jpg',
    releaseDate: 'DEC 05, 2026',
    formats: ['4K', 'Dolby Atmos'],
    synopsis: 'The epic rule begins as Pushpa Raj expands his empire.',
    isNotifyEnabled: true,
  },
  {
    id: 'cs-002',
    title: 'DEADPOOL & WOLVERINE',
    slug: 'deadpool-wolverine',
    language: 'English',
    genres: ['Action', 'Comedy'],
    certificate: 'A',
    posterUrl: '/images/movies/deadpool&wolverine poster.jpg',
    releaseDate: 'JUL 26, 2026',
    formats: ['4K', 'Dolby Cinema'],
    synopsis: 'Wolverine is recovering from his injuries when he crosses paths with Deadpool.',
    isNotifyEnabled: true,
  },
  {
    id: 'cs-003',
    title: 'KALKI 2898 AD',
    slug: 'kalki-2898-ad',
    language: 'Telugu',
    genres: ['Sci-Fi', 'Action'],
    certificate: 'UA',
    posterUrl: '/images/movies/kalki poster.jpg',
    releaseDate: 'JUN 27, 2026',
    formats: ['4K', 'Dolby Cinema'],
    synopsis: 'A modern avatar of Vishnu descends to protect the world.',
    isNotifyEnabled: true,
  },
  {
    id: 'cs-004',
    title: 'STREE 2',
    slug: 'stree-2',
    language: 'Hindi',
    genres: ['Horror', 'Comedy'],
    certificate: 'UA',
    posterUrl: '/images/movies/stree2 poster.jpg',
    releaseDate: 'AUG 15, 2026',
    formats: ['4K'],
    synopsis: 'Chanderi is haunted once again by a new terrifying threat.',
    isNotifyEnabled: true,
  },
  {
    id: 'cs-005',
    title: 'GOAT — THE GREATEST OF ALL TIME',
    slug: 'goat',
    language: 'Tamil',
    genres: ['Action', 'Thriller'],
    certificate: 'UA',
    posterUrl: '/images/movies/goat poster.jpg',
    releaseDate: 'SEP 05, 2026',
    formats: ['4K', 'Dolby Atmos'],
    synopsis: 'A high-octane action saga spanning decades.',
    isNotifyEnabled: true,
  },
];

// =============================================================================
// Experience Features ("More Than A Movie" — Page 4 of Mockup)
// =============================================================================

export const experienceFeatures: ExperienceFeature[] = [
  {
    id: 'exp-01',
    title: 'DOLBY VISION',
    tagline: 'ULTRA-VIVID PICTURE QUALITY',
    description: 'A Dolby Vision projection experience designed to bring extraordinary color, contrast, and brightness to every frame.',
    badge: 'FLAGSHIP VISUALS',
    iconName: 'vision',
  },
  {
    id: 'exp-02',
    title: 'DOLBY ATMOS',
    tagline: 'STUDIO-GRADE SPATIAL AUDIO',
    description: 'An audio experience engineered to make every moment feel closer, clearer, and more real with sound flowing all around you.',
    badge: '360° ACOUSTICS',
    iconName: 'atmos',
  },
  {
    id: 'exp-03',
    title: 'PREMIUM SEATING',
    tagline: 'LUXURY ERGONOMIC COMFORT',
    description: 'Comfort designed to let you settle in and stay immersed throughout the whole motion picture.',
    badge: 'RECLINER LUXURY',
    iconName: 'seating',
  },
  {
    id: 'exp-04',
    title: 'PREMIUM AMENITIES',
    tagline: 'GOURMET CONCESSIONS & PARKING',
    description: 'Everything around the screen designed to complement the overall movie-going experience.',
    badge: 'FINE DINE & PARKING',
    iconName: 'amenities',
  },
];

// =============================================================================
// Screen Details ("Two Screens" — Page 5 of Mockup)
// =============================================================================

export const screenDetails: ScreenDetail[] = [
  {
    id: 'screen-01-detail',
    screenNumber: 'SCREEN 01',
    title: 'DOLBY CINEMA',
    badge: 'FLAGSHIP AUDITORIUM',
    capacity: 450,
    projection: 'Dolby Vision',
    audio: 'Studio Grade Dolby Atmos',
    seating: 'Luxury Ergonomic Plush Seating',
    description: 'Our flagship auditorium bringing together dolby vision projection and studio grade dolby atmos sound for an unforgettable viewing experience.',
    imageUrl: '/images/gallery/evm-curved-screen.png',
    specs: [
      { label: 'PROJECTION', value: 'DOLBY VISION' },
      { label: 'AUDIO', value: 'STUDIO GRADE DOLBY ATMOS' },
      { label: 'CAPACITY', value: '450 SEATS' },
      { label: 'SCREEN', value: 'SCREEN 01' },
    ],
  },
  {
    id: 'screen-02-detail',
    screenNumber: 'SCREEN 02',
    title: '4K DOLBY ATMOS',
    badge: 'CLASSIC AUDITORIUM',
    capacity: 155,
    projection: '4K Laser',
    audio: 'Dolby Atmos',
    seating: 'Premium Stadium Seating',
    description: 'A refined viewing environment featuring ultra-sharp 4K laser projection and enveloping Dolby Atmos surround sound.',
    imageUrl: '/images/screens/screen-02-4k.jpg',
    specs: [
      { label: 'PROJECTION', value: '4K LASER' },
      { label: 'AUDIO', value: 'DOLBY ATMOS' },
      { label: 'CAPACITY', value: '155 SEATS' },
      { label: 'SCREEN', value: 'SCREEN 02' },
    ],
  },
];

// =============================================================================
// Legacy Milestones ("Our Legacy" — 1982, 2009, TODAY)
// =============================================================================

export const legacyMilestones: LegacyMilestone[] = [
  {
    year: '1982',
    title: 'THE BEGINNING',
    subtitle: 'HERITAGE & ORIGINS',
    description: 'EVM Cinemas opened its doors in 1982, establishing a rich heritage of entertainment and landmark cinema experience.',
    imageUrl: '/images/legacy/legacy-1982.jpg',
  },
  {
    year: '2009',
    title: 'A NEW CHAPTER',
    subtitle: 'MODERNIZATION & EXPANSION',
    description: 'In 2009, EVM Cinemas unveiled a new chapter with upgraded projection technology and architectural refinements.',
    imageUrl: '/images/legacy/legacy-2009.jpg',
  },
  {
    year: 'TODAY',
    title: 'AHEAD OF ITS TIME',
    subtitle: 'FLAGSHIP DOLBY CINEMA',
    description: 'Today, EVM Cinemas stands ahead of its time, delivering dual 4K laser projection and Dolby Atmos spatial surround sound.',
    imageUrl: '/images/legacy/legacy-today.jpg',
  },
];

// =============================================================================
// Gallery Items ("Location / Gallery" — Page 7 of Mockup)
// =============================================================================

export const galleryItems: GalleryItem[] = [
  {
    id: 'gal-01',
    imageUrl: '/images/gallery/evm-exterior-night.png',
    alt: 'EVM Cinemas Illuminated Night Exterior with Dolby Cinema',
    caption: 'Modern Illuminated Exterior',
    category: 'exterior',
    order: 1,
  },
  {
    id: 'gal-02',
    imageUrl: '/images/gallery/evm-entrance-steps.jpg',
    alt: 'EVM Cinemas Grand Entrance Steps & Illuminated Lobby',
    caption: 'Grand Entrance & Lobby',
    category: 'interior',
    order: 2,
  },
  {
    id: 'gal-03',
    imageUrl: '/images/gallery/evm-dolby-corridor.png',
    alt: 'EVM Cinemas Dolby Cinema Grand Corridor & Ambient Ceiling Arches',
    caption: 'Dolby Cinema Grand Corridor',
    category: 'interior',
    order: 3,
  },
  {
    id: 'gal-04',
    imageUrl: '/images/gallery/evm-box-office.png',
    alt: 'EVM Cinemas Box Office & Ticketing Counter',
    caption: 'EVM Box Office',
    category: 'lobby',
    order: 4,
  },
  {
    id: 'gal-05',
    imageUrl: '/images/gallery/evm-curved-screen.png',
    alt: 'EVM Cinemas Giant Curved Auditorium Screen with Stadium Seating',
    caption: 'Curved Screen Auditorium',
    category: 'screen',
    order: 5,
  },
  {
    id: 'gal-06',
    imageUrl: '/images/gallery/evm-auditorium-wide.png',
    alt: 'EVM Cinemas Luxury Stadium Recliner Seating & Projection Beam',
    caption: 'Luxury Stadium Seating',
    category: 'screen',
    order: 6,
  },
  {
    id: 'gal-07',
    imageUrl: '/images/gallery/evm-concession-lounge.png',
    alt: 'EVM Cinemas Gourmet Concessions & Lounge Lobby',
    caption: 'Gourmet Concessions & Lobby',
    category: 'lobby',
    order: 7,
  },
  {
    id: 'gal-08',
    imageUrl: '/images/gallery/evm-auditorium-seating.png',
    alt: 'EVM Cinemas Auditorium Acoustics & Step Lighting',
    caption: 'Auditorium Acoustics & Ambience',
    category: 'screen',
    order: 8,
  },
];

export const mockShowDates: ShowDate[] = [];

// =============================================================================
// Contact / Location placeholders
// PLACEHOLDER ONLY — no real EVM contact details have been supplied.
// Replace with CMS / client data. `null` means "not yet supplied".
// =============================================================================

export const contactDetails: {
  phone: string | null;
  email: string | null;
  addressLine: string | null;
  locationDescription: string;
  mapsUrl: string | null;
  socials: { label: string; href: string | null }[];
} = {
  phone: '+91 484 485 7577',
  email: null,
  addressLine: 'Opp. EVM Theater, Chullickal, Kochi, Keralam 682005',
  locationDescription:
    'EVM Cinemas is located at Opp. EVM Theater, Chullickal, Kochi, Keralam 682005.',
  mapsUrl: 'https://maps.google.com/?q=Opp.+EVM+Theater,+Chullickal,+Kochi,+Kerala+682005',
  socials: [
    { label: 'Instagram', href: 'https://www.instagram.com/evmcinemasfortkochi/' },
    { label: 'Facebook', href: 'https://www.facebook.com/evmcinemasfortkochi' },
    { label: 'YouTube', href: 'https://www.youtube.com/@evmcinemafortkochi' },
    { label: 'X (Twitter)', href: 'https://x.com/EVMCinemasKochi' },
  ],
};
