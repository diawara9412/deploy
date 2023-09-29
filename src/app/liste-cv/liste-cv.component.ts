import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-liste-cv',
  templateUrl: './liste-cv.component.html',
  styleUrls: ['./liste-cv.component.scss']
})
export class ListeCVComponent implements OnInit {
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
   reversedList: string[] = [];
   constructor(private service : ServiceService) { }
 
   ngOnInit(): void {
     
     this.AllCV()
    //  this.AllAppelOffre()
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
   this.service.AllCvByConfirmerTrue().subscribe({
     next : (data)=>{
       this.listCv =data
      
       console.log(this.listCv);
       for (let i = this.listCv.length - 1; i >= 0; i--) {
        this.reversedList.push(this.listCv[i]);
      }
      return this.reversedList;
       
     }
   })
 }
 
//  AllAppelOffre(){
//    this.service.getAllAppelOffre().subscribe({
//      next : (data)=>{
//        this.listAppelOffre =data
//        this.listAppelRecent = data
//      }
//    })
//  }
 
 onCategoryChange(event: any) {
   this.selectedCategory = event.target.value;
   if(this.selectedCategory==this.tout){
     this.AllCV();
   }else{
     this.service.getCvByCategorieTrue(this.selectedCategory).subscribe({
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

}
