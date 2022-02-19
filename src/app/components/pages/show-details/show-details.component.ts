import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from 'src/app/services/movies.service';
import { SeriesService } from 'src/app/services/series.service';
import { faStar, faClock } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.css'],
})
export class ShowDetailsComponent implements OnInit {
  show: any;
  showType: string;
  ratingIcon = faStar;
  durationIcon = faClock;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.show = this.router.getCurrentNavigation().extras.state['show'];
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.showType = routeParams.get('showType');
  }

  formatDuration(duration: number): string {
    const hours = Math.trunc(duration / 60);
    const minutes = Math.trunc(hours / 60);

    return `${hours}hr${minutes}min`;
  }
}
