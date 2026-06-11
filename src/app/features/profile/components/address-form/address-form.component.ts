import { Component } from '@angular/core';
import { ProfileService } from '@features/profile/services/profile.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-address-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.css'
})
export class AddressFormComponent {
  address: any[] = [];
  selectedAddressIndex:number=-1;
 selectAddress(index: number) {
  this.selectedAddressIndex = index;
}
  constructor(private profileService: ProfileService) {}
  
    ngOnInit(): void {
  
      this.profileService.getAllAddress().subscribe({
        next: (data) => {
          this.address = data;
        },
        error: (err) => {
          console.log(err);
        }
      });
      
  
    }
    
}
