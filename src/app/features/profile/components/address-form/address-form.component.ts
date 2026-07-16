import { Component,HostListener, Input, output } from '@angular/core';
import { ProfileService } from '@features/profile/services/profile.service';
import { CommonModule } from '@angular/common';
import { FormsModule,NgForm} from '@angular/forms';
 import { Router } from '@angular/router';
 import { RouterOutlet } from '@angular/router';
 import { RouterLink } from '@angular/router';
 import { AddnewaddressComponent } from '../addnewaddress/addnewaddress.component';
 import { EditaddressComponent } from '../editaddress/editaddress.component';
 import { Output } from '@angular/core';
 import { EventEmitter } from '@angular/core';
@Component({
  selector: 'app-address-form',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink,AddnewaddressComponent,EditaddressComponent],
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.css'
})
export class AddressFormComponent {
 
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
  selectedAddressIndex:number=-1;
  display:number=0;
  editaddress!:any;
 ismobile!:boolean;
 updateid!:number;
isDefault=false;
@Output() profiledisplayvalue=new EventEmitter<number>();

 selectAddress(index:any) {
  this.selectedAddressIndex = index;
}
 
  
    ngOnInit(): void {
      this.getalladdress();
      this.checkScreenSize();
    }
     @HostListener('window:resize')
      onResize() {
        this.checkScreenSize();
      }
      checkScreenSize(){
        this.ismobile=window.innerWidth<=768;
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
    
        
     
      if(this.display===1){
         this.profileService.postAddress(add).subscribe(() => {
    this.getalladdress();
  });
      }
   
     if(this.display===2){
       this.profileService.patchAddress(this.updateid,update).subscribe(() => {
    this.getalladdress();
  });
        
  this.updateid=0;
     }
     if(this.isDefault)
        {
          if(this.display===2)
            this.selectedAddressIndex=this.updateid-1;
          else
            this.selectedAddressIndex=this.address.length;
        }
      this.display=0;
      this.profiledisplayvalue.emit(0);

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
  add(){
 
     this.flat='';
     this.building='';
     this.street='';
     this.city='';
     this.pincode='';
  this.display=1;
 this.profiledisplayvalue.emit(1);
 }
   edit(data:any){
     this.display=2;
     this.profiledisplayvalue.emit(2);
     this.type=data.type;
     this.flat=data.addressLine;
     this.building=data.building;
     this.street=data.area;
     this.city=data.city;
     this.pincode=data.pincode;
     this.updateid=data.id;  
   }
    deleteAddress(id:any){
  if(this.display!==1){
    this.profileService.deleteAddress(id).subscribe(() => {
    this.getalladdress();
  });
  }
}
deleteAddressedit(){
  if(this.display===1)
   {
    this.display=0;
    this.profiledisplayvalue.emit(0);
   }
  else
    this.deleteAddress(this.updateid);
}
}
