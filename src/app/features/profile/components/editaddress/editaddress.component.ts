import { Component, output } from '@angular/core';
import { ProfileService } from '@features/profile/services/profile.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgForm} from '@angular/forms';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Input } from '@angular/core';
import { HostListener } from '@angular/core';
@Component({
  selector: 'app-editaddress',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './editaddress.component.html',
  styleUrl: './editaddress.component.css'
})
export class EditaddressComponent {
   constructor(private profileService: ProfileService,private router: Router) {}
  @Input() add!:any;
   address: any[] = [];
  type:any="Home";
    flat!:any;
    building!:any;
    street!:any;
    city!:any;
    state!:any;
    pincode!:any;
   selectedtype:number=1;
  updateid!:any;
   ismobile!:boolean
   ngOnInit(){
    //this.updateid=address.id;
    this.checkScreenSize();
    this.updateid=this.add.id;
    this.type=this.add.type;
     this.flat=this.add.addressLine;
    this.building=this.add.building;
    this.street=this.add.area;
    this.city=this.add.city;
    this.state='';
    this.pincode=this.add.pincode;
    
   }
   @Output() updateaddress:any = new EventEmitter<number>();

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
  
  
        const update={
                 "type": this.type,
                  "addressLine": this.flat,
                  "building":this.building,
                  "area": this.street,
                  "city": this.city,
                  "pincode": this.pincode,
        }
      
       
          this.profileService.patchAddress(this.updateid,update).subscribe(() => {
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
