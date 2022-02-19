import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  icon = faSearch;

  // Form Properties
  type: string;
  title: string;

  // Output
  @Output() onSearch: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    this.type = 'movie';
    this.title = '';
  }

  onSubmit() {
    const searchParams = { title: this.title, type: this.type };

    this.onSearch.emit(searchParams);
  }

  onEmpty() {
    if (!this.title) {
      const searchParams = { title: this.title, type: this.type };
      this.onSearch.emit(searchParams);
    }
  }

  onChangeRadio() {
    const searchParams = { title: this.title, type: this.type };
    this.onSearch.emit(searchParams);
  }
}
