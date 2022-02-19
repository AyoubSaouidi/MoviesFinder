import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { Movie, MovieByTitle, MovieRating } from 'src/app/Models/Movie';
import { from, map, mergeMap, concatMap, EMPTY } from 'rxjs';
import { SeriesService } from 'src/app/services/series.service';
import { Series, SeriesByTitle, SeriesRating } from 'src/app/Models/Series';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  // Movies
  movies: Movie[] = [];
  filteredMovies: Movie[] = [];
  // Series
  series: Series[] = [];
  filteredSeries: Series[] = [];
  // Search Text
  searchTitle: string = '';
  searchType: string = 'movie';

  constructor(
    private moviesService: MoviesService,
    private seriesService: SeriesService
  ) {
    this.filteredMovies = [];
    this.filteredSeries = [];
    this.fetchRatedMovies(1, 20, this.searchType);
  }

  ngOnInit(): void {}

  searchMovies(searchParams: { title: string; type: string }) {
    this.searchTitle = searchParams.title;
    this.searchType = searchParams.type;
    if (searchParams.title !== '') {
      if (searchParams.type === 'movie') {
        this.filteredMovies = [];
        this.filteredSeries = [];
        this.series = [];
        this.movies = [];
        this.moviesService
          .getMoviesByTitle(searchParams)
          .pipe(
            mergeMap((res) => {
              if (res.results.length !== 0) {
                return from(res.results.slice(0, 20)).pipe(
                  concatMap((movieInfos: MovieByTitle) =>
                    this.moviesService.getMovieById(movieInfos.imdb_id)
                  ),
                  map((movieRes) => {
                    return movieRes.results;
                  })
                );
              }

              return EMPTY;
            })
          )
          .subscribe({
            next: (movies) => {
              this.filteredMovies.push(movies);
              this.moviesService.setLoading(false);
            },
            complete: () => {
              this.moviesService.setLoading(false);
            },
          });
      } else if (searchParams.type === 'series') {
        this.filteredMovies = [];
        this.filteredSeries = [];
        this.series = [];
        this.movies = [];
        this.seriesService
          .getSeriesByTitle(searchParams)
          .pipe(
            mergeMap((res) => {
              if (res.results.length !== 0) {
                return from(res.results.slice(0, 20)).pipe(
                  concatMap((seriesinfo: SeriesByTitle) =>
                    this.seriesService.getSeriesById(seriesinfo.imdb_id)
                  ),
                  map((seriesRes) => {
                    return seriesRes.results;
                  })
                );
              }

              return EMPTY;
            })
          )
          .subscribe({
            next: (series) => {
              this.filteredSeries.push(series);
              this.seriesService.setLoading(false);
            },
            complete: () => {
              this.seriesService.setLoading(false);
            },
          });
      }
    } else {
      this.fetchRatedMovies(1, 20, searchParams.type);
    }
  }

  fetchRatedMovies(page: number = 1, size: number = 20, type: string) {
    if (type === 'movie') {
      this.filteredMovies = [];
      this.filteredSeries = [];
      this.series = [];
      this.movies = [];
      this.moviesService
        .getMoviesOrderByRating()
        .pipe(
          mergeMap((res) =>
            from(res.results).pipe(
              concatMap((rating: MovieRating) =>
                this.moviesService.getMovieById(rating.imdb_id)
              ),
              map((movieRes) => {
                return movieRes.results;
              })
            )
          )
        )
        .subscribe((movie) => {
          this.movies.push(movie);
          this.moviesService.setLoading(false);
        });
    } else if (type === 'series') {
      this.filteredMovies = [];
      this.filteredSeries = [];
      this.series = [];
      this.movies = [];
      this.seriesService
        .getSeriesOrderByRating()
        .pipe(
          mergeMap((res) =>
            from(res.results).pipe(
              concatMap((rating: SeriesRating) =>
                this.seriesService.getSeriesById(rating.imdb_id)
              ),
              map((seriesRes) => {
                return seriesRes.results;
              })
            )
          )
        )
        .subscribe((series) => {
          this.series.push(series);
          this.seriesService.setLoading(false);
        });
    }
  }

  isLoadingMovies(): boolean {
    return this.moviesService.loading && this.searchType === 'movie';
  }

  isLoadingSeries(): boolean {
    return this.seriesService.loading && this.searchType === 'series';
  }

  isFilteredMovies(): boolean {
    return this.filteredMovies.length !== 0;
  }

  isFilteredSeries(): boolean {
    return this.filteredSeries.length !== 0;
  }

  isSearchFilled(): boolean {
    return this.searchTitle !== '';
  }

  notFound(): boolean {
    return (
      (!this.moviesService.loading &&
        !this.isFilteredMovies() &&
        this.isSearchFilled() &&
        this.searchType === 'movie') ||
      (!this.seriesService.loading &&
        !this.isFilteredSeries() &&
        this.isSearchFilled() &&
        this.searchType === 'series')
    );
  }

  isLoading(): boolean {
    return (
      (this.isLoadingMovies() && this.searchType === 'movie') ||
      (this.isLoadingSeries() && this.searchType === 'series')
    );
  }

  canDisplay(): boolean {
    return (
      (this.searchType === 'movie' &&
        !this.isLoadingMovies() &&
        ((!this.isSearchFilled() && !this.isFilteredMovies()) ||
          (this.isSearchFilled() && this.isFilteredMovies()))) ||
      (this.searchType === 'series' &&
        !this.isLoadingSeries() &&
        ((!this.isSearchFilled() && !this.isFilteredSeries()) ||
          (this.isSearchFilled() && this.isFilteredSeries())))
    );
  }
}
