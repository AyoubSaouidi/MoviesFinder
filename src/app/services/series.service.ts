import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Series, SeriesByTitle, SeriesRating } from '../Models/Series';

interface SeriesRatingResponse {
  count: number;
  next: string;
  previous: string;
  results: SeriesRating[];
}

interface SeriesByTitleResponse {
  results: SeriesByTitle[];
}

interface SeriesResponse {
  results: Series;
}

const options = {
  headers: new HttpHeaders({
    'x-rapidapi-host': 'data-imdb1.p.rapidapi.com',
    'x-rapidapi-key': 'f166e88084msh987fef683622ed4p11c631jsn06408333a43f',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class SeriesService {
  loading: boolean = false;
  apiUrl: string = 'https://data-imdb1.p.rapidapi.com/series';

  constructor(private httpClient: HttpClient) {}

  // Get Movie By Id
  getSeriesById(id: string): Observable<SeriesResponse> {
    const url = `${this.apiUrl}/id/${id}/`;
    return this.httpClient.get<SeriesResponse>(url, options);
  }

  // Get Movies Ordered By Rating
  getSeriesOrderByRating(
    page: number = 1,
    size: number = 20
  ): Observable<SeriesRatingResponse> {
    const url = `${this.apiUrl}/order/byRating/?page=${page}&page_size=${size}`;

    this.setLoading(true);

    return this.httpClient.get<SeriesRatingResponse>(url, options);
  }

  // Get Movies By Title
  getSeriesByTitle(searchParams: {
    title: string;
    type: string;
  }): Observable<SeriesByTitleResponse> {
    const url = `${this.apiUrl}/idbyTitle/${searchParams.title}/`;

    this.setLoading(true);

    return this.httpClient.get<SeriesByTitleResponse>(url, options);
  }

  setLoading(state: boolean): void {
    this.loading = state;
  }
}
