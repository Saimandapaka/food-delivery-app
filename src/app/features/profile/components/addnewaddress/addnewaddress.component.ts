import { Component } from '@angular/core';
import { ProfileService } from '@features/profile/services/profile.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgForm} from '@angular/forms';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { HostListener } from '@angular/core';
@Component({
  selector: 'app-addnewaddress',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './addnewaddress.component.html',
  styleUrl: './addnewaddress.component.css'
})
export class AddnewaddressComponent {
   constructor(private profileService: ProfileService,private router: Router) {}

    address: any[] = [];
type:any="Home";
  flat!:any;
  building!:any;
  street!:any;
  city!:any;
  state!:any;
  pincode!:any;
 selectedtype:number=1;
 
 ismobile!:boolean
 ngOnInit(){
  this.checkScreenSize();
 }
  @HostListener('window:resize')
          onResize() {
            this.checkScreenSize();
          }
          checkScreenSize(){
            this.ismobile=window.innerWidth<=768;
          }
 getalladdress(){
  this.profileService.getAllAddress().subscribe({
        next: (data) => {
          this.address = data;
        },
        error: (err) => {
          console.log(err);
        }
      });
}
  validation(form: NgForm) {

  if (form.invalid) {
    return;
  }

  const add={
        
                "id": this.address.length+1+"",
                "userId": 1,
                "type": this.type,
                "addressLine": this.flat,
                "building":this.building,
                "area": this.street,
                "city": this.city,
                "pincode": this.pincode,
                "isDefault": true
      }
      const update={
               "type": this.type,
                "addressLine": this.flat,
                "building":this.building,
                "area": this.street,
                "city": this.city,
                "pincode": this.pincode,
      }
    
     
       this.profileService.postAddress(add).subscribe(() => {
    this.getalladdress();
  });
   
  //    if(this.display===2){
  //      this.profileService.patchAddress(this.updateid,update).subscribe(() => {
  //   this.getalladdress();
  // });
  // this.updateid=0;
  //    }
  this.display.emit(0);
}
cancel(){
  
}

// edit(address:any){
//   this.updateid=address.id;
//   this.type=address.type
//    this.flat=address.addressLine;
//   this.building=address.building;
//   this.street=address.area;
//   this.city=address.city;
//   this.state='';
//   this.pincode=address.pincode;
//   console.log(address);
//   console.log(this.type);
//   console.log(this.flat);
//   console.log(this.building);
//   console.log(this.street);
//   console.log(this.city);
//   console.log(this.pincode);
//   this.display=2;
// }
@Output() display = new EventEmitter<number>();

changeDisplay() {
  this.display.emit(0);
}
}
