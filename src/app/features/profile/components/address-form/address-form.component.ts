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
}
 
  
    ngOnInit(): void {
       this.issavedaddress=this.router.url.startsWith('/profile/savedaddress');
       this.profileService.mode.subscribe(mode => {
    this.mode = mode;
  });
      this.getalladdress();
      this.checkScreenSize();
    }
     @HostListener('window:resize')
      onResize() {
        this.checkScreenSize();
      }
      checkScreenSize(){
        this.ismobile=window.innerWidth<=768;
        this.issavedaddress=this.router.url.startsWith('/profile/savedaddress');
         if(window.innerWidth>768 && this.router.url.includes('/profile'))
            this.router.navigate(['profile']);
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
    
        
     
      if(this.mode==='add'){
         this.profileService.postAddress(add).subscribe(() => {
    this.getalladdress();
  });
      }
   
     if(this.mode==='edit'){
       this.profileService.patchAddress(this.updateid,update).subscribe(() => {
    this.getalladdress();
  });
        
  this.updateid=0;
     }
     if(this.isDefault)
        {
          if(this.mode==='edit')
            this.selectedAddressIndex=this.updateid-1;
          else
            this.selectedAddressIndex=this.address.length;
        }
         this.profileService.mode.next("list");
      this.display=0;
    

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
     this.profileService.mode.next("add");
     this.display=1;

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
