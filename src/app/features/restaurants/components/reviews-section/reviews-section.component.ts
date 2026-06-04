import { Component } from '@angular/core';
import { Input } from '@angular/core';
@Component({
  selector: 'app-reviews-section',
  
  templateUrl: './reviews-section.component.html',
  styleUrl: './reviews-section.component.css'
})
export class ReviewsSectionComponent {
@Input() restaurant:any
}
