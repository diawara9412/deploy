import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-cvadmin',
  templateUrl: './cvadmin.component.html',
  styleUrls: ['./cvadmin.component.scss']
})
export class CvadminComponent implements OnInit {
  listCv : any
  list : any
  listAppelOffre : any
  selectedCategory: any;
   listOffreEmploiSelect: any;
   listCategorie: any;
   tout :any ="tout"
   listCategorieAppel: any;
   selectedCategoryAppel: any;
   listOffreRecent: any;
   listAppelRecent: any;
   user: any;
   loginData: any;
   p: number = 1;
   constructor(private service : ServiceService) { }
 
   ngOnInit(): void {
     
     this.AllCV()
     
     this.GetCategorie()
     this.GetCategorieAppel()
     const user: any | null = sessionStorage.getItem('isLogin');
     this.user = JSON.parse(user);
     if(this.user !== null){
       this.loginData=this.user
       console.log(this.loginData)
       this.service.CVByUtilisateur(this.loginData.id).subscribe((data)=>{
          this.list =data
          console.log(this.list);
          
       })
     }
   }
   
 
 
 AllCV(){
   this.service.AllCv().subscribe({
     next : (data)=>{
       this.listCv =data
       this.listOffreRecent =data;
       console.log(this.listCv);
       
     }
   })
 }
 

 
 onCategoryChange(event: any) {
   this.selectedCategory = event.target.value;
   if(this.selectedCategory==this.tout){
     this.AllCV();
   }else{
     this.service.getCvByCategorie(this.selectedCategory).subscribe({
       next :(data)=>{
         this.listCv  = data
         console.log(this.listCv);
         
       }
     })
   }
   
 
   
 }

 GetCategorie(){
   this.service.getCategorie().subscribe((data)=>{
     this.listCategorie=data
     console.log(this.listCategorie)
   })
 }
 GetCategorieAppel(){
   this.service.getCategorieAppel().subscribe((data)=>{
     this.listCategorieAppel=data
     // this.selectedCategoryAppel = this.listCategorieAppel[0]
     // console.log(this.listCategorie)
   })
 }
 
 logOut(){
   if(confirm('êtes-vous sûr de vouloir vous déconnecter ?'))
   sessionStorage.removeItem('isLogin');
   sessionStorage.removeItem('TOKEN');
   
 }
 
 ConfirmerCvToTrueToTrue(id :any){
  if(confirm('êtes vous sûr de Confirmer ?'))
  this.service.ConfirmerCvToTrue(id).subscribe((data)=>{
    this.ngOnInit()
    this.AllCV()
  })
 }
}
