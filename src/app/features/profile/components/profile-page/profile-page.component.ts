import { Component } from '@angular/core';
import { ProfileService } from '@features/profile/services/profile.service';
import { ProfileInfoComponent } from '../profile-info/profile-info.component';
@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [ProfileInfoComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent {
  selected=1;
  users: any[] = [];
  firstchar!:CharacterData;
  name!:string;
  phnumber!:number;

constructor(private profileService: ProfileService) {}

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
}
