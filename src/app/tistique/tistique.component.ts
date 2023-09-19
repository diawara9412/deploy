import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-tistique',
  templateUrl: './tistique.component.html',
  styleUrls: ['./tistique.component.scss']
})
export class TistiqueComponent implements OnInit {
  listOffreEmploi : any
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
  isToggled: boolean = false;
  p: number = 1;
  listEntreprise: any;
  listCv :any
  listAffaire :any
  tailleAffaire : any
  tailleOffre : any
  tailleAppel : any
  tailleCv : any
  constructor(private service : ServiceService,) { }
 
  ngOnInit(): void {
    
    const user: any | null = sessionStorage.getItem('isLogin');
    this.user = JSON.parse(user);
    console.log(this.user);
    if (this.user !== null) {
      this.loginData=this.user
      console.log(this.user);
    }
    this.AllOffreEmploi()
    this.AllAppelOffre()
    this.AllAffaire()
    this.AllCV()
  }
  
 

  AllAffaire(){
    this.service.AllAffaire().subscribe({
      next : (data)=>{
        this.listAffaire =data
        this.tailleAffaire=this.listAffaire.length
        console.log(this.tailleAffaire);
        
      }
    })
  }

  AllEntreprise(){
    this.service.AllEntreprise().subscribe({
      next : (data)=>{
        this.listEntreprise =data
        
        console.log(this.listEntreprise);
        
      }
    })
  }
 
  AllOffreEmploi(){
    this.service.getAllOffreEmploi().subscribe({
      next : (data)=>{
        this.listOffreEmploi =data
        this.tailleOffre=this.listOffreEmploi.length
        console.log(this.tailleOffre);
        
      }
    })
  }
  
  AllAppelOffre(){
    this.service.getAllAppelOffre().subscribe({
      next : (data)=>{
        this.listAppelOffre =data
        this.tailleAppel=this.listAppelOffre.length
        console.log(this.tailleAppel);
      }
    })
  }
  
  AllCV(){
    this.service.AllCv().subscribe({
      next : (data)=>{
        this.listCv =data
       this.tailleCv=this.listCv.length
        console.log(this.tailleCv);
        
      }
    })
  }





}
