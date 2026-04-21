import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  standalone: false,
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.css'
})

export class StarRatingComponent {
  @Input() rating: number = 0;
  @Input() totalRatings: number = 0;
  @Input() showCount: boolean = false;
}
