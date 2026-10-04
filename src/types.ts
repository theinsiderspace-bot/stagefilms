export type Genre =
  | 'Horror'
  | 'Sci-Fi'
  | 'Thriller'
  | 'Action'
  | 'Drama'
  | 'Comedy'
  | 'Mystery'
  | 'Indie'
  | 'Documentary';

export type ReleaseStatus =
  | 'in_theaters'
  | 'digital_vod'
  | 'bluray_physical'
  | 'coming_soon'
  | 'festival_circuit'
  | 'under_review';

export type ContentRating = 'G' | 'PG' | 'PG-13' | 'R' | 'NC-17' | 'Not Rated';

export type BudgetTier =
  | 'Micro-Budget (< $1M)'
  | 'Indie ($1M - $5M)'
  | 'Mid-Tier ($5M - $20M)'
  | 'Studio Tier ($20M+)';

export interface WatchLinks {
  sonyPicturesStore?: string;
  appleTv?: string;
  amazonPrime?: string;
  fandango?: string;
  moviesAnywhere?: string;
  googlePlay?: string;
}

export interface TechnicalSpecs {
  aspectRatio: string;
  soundMix: string;
  camera: string;
  color: string;
  runtimeMinutes: number;
}

export interface FilmReview {
  critic: string;
  publication: string;
  quote: string;
  score?: string;
}

export interface Film {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  synopsis: string;
  releaseYear: number;
  rating: ContentRating;
  runtimeMinutes: number;
  genres: Genre[];
  releaseStatus: ReleaseStatus;
  releaseDateText: string;
  posterUrl: string;
  backdropUrl: string;
  trailerUrl: string; // YouTube embed or video URL
  trailerThumbnail?: string;
  director: string;
  writers: string[];
  producers: string[];
  cast: string[];
  studio: string;
  distributor: string;
  laurels?: string[];
  technicalSpecs: TechnicalSpecs;
  watchLinks: WatchLinks;
  reviews?: FilmReview[];
  isFeatured?: boolean;
  isStage6Original?: boolean;
  isCreatorSubmission?: boolean;
  creatorId?: string;
  creatorName?: string;
  screenerPasscode?: string;
  isScreenerProtected?: boolean;
  screenerUrl?: string;
  pitchDeckNotes?: string;
  budgetTier?: BudgetTier;
  createdAt: string;
  acquisitionsStatus?: 'draft' | 'under_review' | 'greenlit' | 'distributed';
  executiveFeedback?: string;
}

export interface CreatorUser {
  id: string;
  name: string;
  email: string;
  role: 'Director' | 'Producer' | 'Screenwriter' | 'Cinematographer' | 'Studio Executive';
  company: string;
  bio: string;
  avatarUrl: string;
  isVerified: boolean;
  createdFilmsCount: number;
  joinedDate: string;
}

export interface ScreenerAccessLog {
  id: string;
  filmId: string;
  filmTitle: string;
  viewerLocation: string;
  timestamp: string;
  durationWatchedMinutes: number;
  passcodeUsed: string;
}
