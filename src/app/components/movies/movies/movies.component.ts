import { Component, OnInit, Input } from '@angular/core';
import { Movie } from 'src/app/Models/Movie';
import { Series } from 'src/app/Models/Series';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit {
  @Input() movies: any[];
  // @Input() series: Series[];
  @Input() type: string;

  constructor() {}

  ngOnInit(): void {}
}
