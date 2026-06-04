import { Component, input } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-info-section',
  standalone: false,
  templateUrl: './info-section.component.html',
  styleUrl: './info-section.component.css'
})
export class InfoSectionComponent {
@Input() restaurant:any

}
