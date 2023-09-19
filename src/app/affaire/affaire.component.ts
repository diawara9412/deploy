import { Component, ElementRef, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { DomSanitizer } from '@angular/platform-browser';



@Component({
  selector: 'app-affaire',
  templateUrl: './affaire.component.html',
  styleUrls: ['./affaire.component.scss']
})
export class AffaireComponent implements OnInit {
  selectedStars: number =0;
  listAffaire : any
  listAppelOffre : any
  selectedCategory: any;
   listOffreEmploiSelect: any;
   listCategorie: any;
   tout :any ="tout"
   listCategorieAppel: any;
   selectedCategoryAppel: any;
   listAffaireRecent: any;
   listAppelRecent: any;
   activeImage : string | undefined
   carousel : any
   p: number = 1;
  
   images: string[] = ['assets/img/Appel.png','assets/img/Group 19.png'];
 
  currentImage: string = 'assets/img/Group 19.png';

   constructor(private service : ServiceService,private sanitizer: DomSanitizer) { }
 
   ngOnInit(): void {
    this.startCarousel();
     this.AllAffaire()
 
     this.GetCategorie()

   }
   
   startCarousel() {
    let index = 0;
    setInterval(() => {
      this.currentImage = this.images[index];
      index = (index + 1) % this.images.length;
    }, 3000);
  }
  
 AllAffaire(){
   this.service.AllAffaireByConfirmerTrue().subscribe({
     next : (data)=>{
       this.listAffaire =data
       this.listAffaireRecent = data
       console.log(this.listAffaire);
       
     }
   })
 }
 

 
 onCategoryChange(event: any) {
   this.selectedCategory = event.target.value;
   if(this.selectedCategory==this.tout){
     this.AllAffaire();
   }else{
     this.service.getAffaireByCategorieTrue(this.selectedCategory).subscribe({
       next :(data)=>{
         this.listAffaire  = data
         console.log(this.listAffaire);
         
       }
     })
   }
   
 
   
 }

 GetCategorie(){
   this.service.getCategorieAffaire().subscribe((data)=>{
     this.listCategorie=data
     console.log(this.listCategorie)
   })
 }
 cleanHtml(html: string): string {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
}

addRating(affaireId: number) {
  if (this.selectedStars !== 0) {
    const newRating = { stars: this.selectedStars };
    this.service.addEvaluationAffaire(affaireId, newRating).subscribe({
      next: (response) => {
        this.AllAffaire()
        console.log("bien");
        this.selectedStars = 0; // Réinitialiser à "0" après l'ajout
      },
      error: (error) => {
        console.log("erreur");
      }
    });
  }
}
}


