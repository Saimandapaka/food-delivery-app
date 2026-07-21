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


  type:any="Home";
  flat!:any;
  building!:any;
  street!:any;
  city!:any;
  state!:any;
  pincode!:any;
 selectedtype:number=1;
  selectedAddressIndex:number=0;
  mode="list";
  display:number=0;
  editaddress!:any;
 ismobile!:boolean;
 issavedaddress!:boolean;
 updateid!:number;
isDefault=false;


 selectAddress(index:any) {

  
 


  this.selectedAddressIndex = index;
  this.profileService.selectedAddress = this.address[index];

}
  constructor(private profileService: ProfileService) {}
  
    ngOnInit(): void {
  
      this.profileService.getAllAddress().subscribe({
        next: (data) => {
          this.address = data;
          // Select the first address by default
      if (this.address.length > 0) {
        this.selectedAddressIndex = 0;
        this.profileService.selectedAddress = this.address[0];
      }
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
     this.profileService.mode.next("add");
     this.display=1;

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
   edit(data:any){
     this.profileService.mode.next("edit");
     this.display=2;
   
     this.type=data.type;
     this.flat=data.addressLine;
     this.building=data.building;
     this.street=data.area;
     this.city=data.city;
     this.pincode=data.pincode;
     this.updateid=data.id;  
   }
    deleteAddress(id:any){
  if(this.mode!=='add'){
    this.profileService.deleteAddress(id).subscribe(() => {
    this.getalladdress();
  });
  }
}
deleteAddressedit(){
  if(this.mode==='add')
   {
     this.profileService.mode.next("list");
    this.display=0;
    
   }
  else
    this.deleteAddress(this.updateid);
}
changemode(){
  this.profileService.mode.next("list");
}

      
  
    }
    
    
  


