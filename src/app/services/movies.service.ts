import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie, MovieByTitle, MovieRating } from '../Models/Movie';

interface MovieRatingResponse {
  count: number;
  next: string;
  previous: string;
  results: MovieRating[];
}

interface MovieByTitleResponse {
  results: MovieByTitle[];
}

interface MovieResponse {
  results: Movie;
}

const options = {
  headers: new HttpHeaders({
    'x-rapidapi-host': 'data-imdb1.p.rapidapi.com',
    'x-rapidapi-key': '-- API KEY HERE --',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  loading: boolean = false;
  apiUrl: string = 'https://data-imdb1.p.rapidapi.com/movie';

  constructor(private httpClient: HttpClient) {}

  // Get Movie By Id
  getMovieById(id: string): Observable<MovieResponse> {
    const url = `${this.apiUrl}/id/${id}/`;
    return this.httpClient.get<MovieResponse>(url, options);
  }

  // Get Movies Ordered By Rating
  getMoviesOrderByRating(
    page: number = 1,
    size: number = 20
  ): Observable<MovieRatingResponse> {
    const url = `${this.apiUrl}/order/byRating/?page=${page}&page_size=${size}`;

    this.setLoading(true);

    return this.httpClient.get<MovieRatingResponse>(url, options);
  }

  // Get Movies By Title
  getMoviesByTitle(searchParams: {
    title: string;
    type: string;
  }): Observable<MovieByTitleResponse> {
    const url = `${this.apiUrl}/imdb_id/byTitle/${searchParams.title}/`;

    this.setLoading(true);

    return this.httpClient.get<MovieByTitleResponse>(url, options);
  }

  setLoading(state: boolean): void {
    this.loading = state;
  }
}
