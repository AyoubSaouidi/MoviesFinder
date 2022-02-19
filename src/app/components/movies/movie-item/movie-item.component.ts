import { Component, OnInit, Input } from '@angular/core';
import { faClock, faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.css'],
})
export class MovieItemComponent implements OnInit {
  durationIcon = faClock;
  ratingIcon = faStar;

  // Inputs
  @Input() movie: any;

  formatDuration(duration: number): string {
    const hours = Math.trunc(duration / 60);
    const minutes = Math.trunc(hours / 60);

    return `${hours}hr${minutes}min`;
  }

  constructor() {}

  ngOnInit(): void {}
}
