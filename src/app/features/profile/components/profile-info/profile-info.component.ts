import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '@features/profile/services/profile.service';
import { Router } from '@angular/router';
import { HostListener } from '@angular/core';
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
constructor(private profileService: ProfileService, private router:Router) {}

  ngOnInit(): void {

   this.getusers();
    

  }
  getusers(){
     this.profileService.getAll().subscribe({
      next: (data) => {
        this.users = data;
        if (this.users.length > 0) {
      this.firstchar = this.users[0].name[0];
      this.name = this.users[0].name;
      this.phnumber = this.users[0].phone;
      this.email = this.users[0].email;
      this.dob = this.users[0].dob;
    }
      },
      error: (err) => {
        console.log(err);
      }
    });
  
  }

  enable(){
    this.isdisabled=false;
  }
  disable(){
    this.isdisabled=true;
    console.log(this.name)
    console.log(this.phnumber);
    console.log(this.email);
    console.log(this.dob);
     const update={
    
               "name": this.name,
                "phone": this.phnumber,
                "email":this.email,
                "dob": this.dob,
                
                
      }
     this.profileService.patchuser(1,update).subscribe(() => {
    this.getusers();
  });
  console.log(update);
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
