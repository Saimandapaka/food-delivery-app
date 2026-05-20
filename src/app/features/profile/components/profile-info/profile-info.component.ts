import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '@features/profile/services/profile.service';
@Component({
  selector: 'app-profile-info',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './profile-info.component.html',
  styleUrl: './profile-info.component.css'
})
export class ProfileInfoComponent {
isdisabled:boolean=true;
 users: any[] = [];
  firstchar!:CharacterData;
  name!:string;
  phnumber!:number;
  email!:string;
  dob!:string;
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
      this.email=this.users[0].email;
      this.dob=this.users[0].dob;
    }
  }
  enable(){
    this.isdisabled=false;
  }
  disable(){
    this.isdisabled=true;
  }
}
