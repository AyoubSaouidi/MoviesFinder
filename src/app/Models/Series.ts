export interface Series {
  imdb_id: string;
  title: string;
  start_year: number;
  end_year: number;
  popularity: number;
  description: string;
  content_rating: string;
  movie_length: number;
  rating: number;
  created_at: string;
  trailer: string;
  image_url: string;
  release: string;
  plot: string;
  banner: string;
  type: string;
  more_like_this: any;
  gen: { id: number; genre: string }[];
  keywords: any[];
}

export interface SeriesRating {
  imdb_id: string;
  title: string;
  rating: number;
}

export interface SeriesByTitle {
  imdb_id: string;
  title: string;
}
