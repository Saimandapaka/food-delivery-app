import { Component } from '@angular/core';
import { ProfileService } from '@features/profile/services/profile.service';
import { ProfileInfoComponent } from '../profile-info/profile-info.component';
import { AddressFormComponent } from '../address-form/address-form.component';
import { CartSummaryComponent } from '@features/cart/components/cart-summary/cart-summary.component';
import { OrdersModule } from '@features/orders/orders.module';
import { CommonModule } from '@angular/common';
import { NotificationsModule } from '@features/notifications/notifications.module';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { HostListener } from '@angular/core';
@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [ProfileInfoComponent,AddressFormComponent,CartSummaryComponent,OrdersModule,CommonModule,NotificationsModule,RouterOutlet],

  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
}) 
export class ProfilePageComponent {
  selected=1;
  users: any[] = [];
  firstchar!:CharacterData;
  name!:string;
  phnumber!:number;
  visiblecomponent:number=0;
constructor(private profileService: ProfileService, private router:Router) {}

  ngOnInit(): void {

    this.profileService.getAll().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => {
        console.log(err);
      }
    });
    
  }
  ngDoCheck(){
    if(this.users.length>0){
      this.firstchar=this.users[0].name[0];
      this.name=this.users[0].name;
      this.phnumber=this.users[0].phone;
    }
    
  }
  scrollToCategory(category: string) {
    document.getElementById(category)?.scrollIntoView({
      behavior: 'smooth'
    });
  }
 navigateTo(path: string) {
  this.router.navigate(['/profile', path]);
}
 @HostListener('window:resize')
          onResize() {
            this.checkScreenSize();
          }
          checkScreenSize(){
            if(window.innerWidth>768){
              this.router.navigate(['profile']);
            }
          }
}
