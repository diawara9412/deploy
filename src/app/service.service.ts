import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
 
})
export class ServiceService {
   url='https://offre-a14e8ed7172f.herokuapp.com/api/';
  apiAuth='https://offre-a14e8ed7172f.herokuapp.com/';
  // url='http://localhost:8080/api/';
  // apiAuth='http://localhost:8080/';
  constructor(private http : HttpClient) { }
  
  presentToast(message: any){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 3000
    })
  }
  presentToastError(message: any){
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: message,
      showConfirmButton: false,
      timer: 3000
    })
  }
  // toast( message :any){

  //   this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
    
  // }
  public login(user: any): Observable<any> {
    return this.http.post(this.apiAuth+"authentication", user);
  }
  addUtilisateur(data:any){
    return this.http.post(this.url+"user/AddUtilisateur",data);
  }
  // addOffreEmploi(data:any, pdf: File): Observable<any>{
  //   const formData: FormData = new FormData();
  //     formData.append("file", pdf);
  //   return this.http.post(this.apiAuth+"produit/addProduit",formData);
  // }
  addOffreEmploi(data:any){
    return this.http.post(this.url+"AddOffremploi",data);
  }
  
  addOffreAppel(data:any){
    return this.http.post(this.url+"AddAppelOffre",data);
  }
  getCategorie(){
    return this.http.get(this.url+"user/AllCategorie");
  }
  getCategorieAppel(){
    return this.http.get(this.url+"user/AllCategorieAppel");
  }
  getCategorieEntreprise(){
    return this.http.get(this.url+"user/AllCategorieEntreprise");
  }
  getCategorieAffaire(){
    return this.http.get(this.url+"user/AllCategorieAffaire");
  }
  getCategorieAnnonce(){
    return this.http.get(this.url+"user/AllCategorieAnnonce");
  }

  getAllOffreEmploi(){
    return this.http.get(this.url+"AllOffremploi");
  }
  getAllOffreEmploiConfirmerFalse(){
    return this.http.get(this.url+"AllOffremploiByConfirmerFalse");
  }
  getAllOffreEmploiConfirmerTrue(){
    return this.http.get(this.url+"user/AllOffremploiByConfirmerTrue");
  }
  getAllAppelOffre(){
    return this.http.get(this.url+"AllAppelOffre");
  }
  getAllAppelOffreConfirmerFalse(){
    return this.http.get(this.url+"AllAppelOffreByConfirmerFalse");
  }
  getAllAppelOffreConfirmerTrue(){
    return this.http.get(this.url+"user/AllAppelOffreByConfirmerTrue");
  }
  getAllOffreEmploiByCategorie(idCategorie : any){
    return this.http.get(this.url+"user/AllOffremploiByCategorie/"+idCategorie);
    
  }
  getAllOffreEmploiByCategorieTrue(idCategorie : any){
    return this.http.get(this.url+"user/AllOffremploiByCategorieTrue/"+idCategorie);
    
  }
  getAllAppelOffreByCategorie(idCategorieAppel : any){
    return this.http.get(this.url+"user/findAppelOffreByCategorie/"+idCategorieAppel);
  }
  getAllAppelOffreByCategorieTrue(idCategorieAppel : any){
    return this.http.get(this.url+"user/findAppelOffreByCategorieTrue/"+idCategorieAppel);
  }
  OffreEmploiById(idOffre : any){
    return this.http.get(this.url+"user/OffremploiById/"+idOffre);
    
  }
  AppelOffreById(idOffre : any){
    return this.http.get(this.url+"user/AppelOffreById/"+idOffre);
    
  }
  OffreEmploiByUtilisateur(idUtilisateur : any){
    return this.http.get(this.url+"AllOffremploiByUtilisateur/"+idUtilisateur);
  }
  AppelOffreByUtilisateur(idUtilisateur : any){
    return this.http.get(this.url+"AllAppelOffreByUtilisateur/"+idUtilisateur);
  }
  deleteOffreEmploi(id:any){
    return this.http.delete(this.url+"DeleteOfrre/"+id);
}
UpdateOffreEmploi(id :number,data:any){
  return this.http.put(this.url +"UpdateOffremploi/"+id,data);
}
deleteAppelOffre(id:any){
  return this.http.delete(this.url+"DeleteAppelOfrre/"+id);
}
UpdateAppelOffre(id :number,data:any){
return this.http.put(this.url +"UpdateAppel/"+id,data);
}
Contacter(body : any){
  return this.http.post(this.url+"user/Addcontact",body);
  
}
UtilisateurById(id : any){
  return this.http.get(this.url+"user/UtilisateurById/"+id);
}
UpdateEmployeur(id :number,data:any){
  return this.http.put(this.url +"UpdateEmployeur/"+id,data);
}
UpdateCandidat(id :number,data:any){
  return this.http.put(this.url +"UpdateCandidat/"+id,data);
}
AddCv(data:any){
  return this.http.post(this.url+"user/AddCv",data);
}
AddListFormatio(id : any,data:any){
  return this.http.post(this.url+"user/ajoutlistCvFormation/"+id,data);
}
AddListExperience(id : any,data:any){
  return this.http.post(this.url+"user/ajoutlistCvexperience/"+id,data);
}
AllCv(){
  return this.http.get(this.url+"AllCv");
}
CvById(id : any){
  return this.http.get(this.url+"user/CvById/"+id);
}
addEntreprise(data:any){
  return this.http.post(this.url+"user/AddEntreprise",data);
}
AllEntreprise(){
  return this.http.get(this.url+"AllEntreprise");
}
AllEntrepriseByConfirmerTrue(){
  return this.http.get(this.url+"user/AllEntrepriseByConfirmerTrue");
}
EntrepriseById(id : any){
  return this.http.get(this.url+"user/EntrepriseById/"+id);
}
getAllOffreEntrepriseByCategorie(idCategorie : any){
  return this.http.get(this.url+"user/AllEntrepriseByCategorie/"+idCategorie);
  
}
getAllOffreEntrepriseByCategorieTrue(idCategorie : any){
  return this.http.get(this.url+"user/AllEntrepriseByCategorieTrue/"+idCategorie);
  
}
getCvByCategorieTrue(idCategorie : any){
  return this.http.get(this.url+"user/AllCvByCategorieTrue/"+idCategorie);
  
}
getCvByCategorie(idCategorie : any){
  return this.http.get(this.url+"user/AllCvByCategorie/"+idCategorie);
  
}
CVByUtilisateur(idUtilisateur : any){
  return this.http.get(this.url+"AllCvByUtilisateur/"+idUtilisateur);
  
}
AllCvByConfirmerTrue(){
  return this.http.get(this.url+"user/AllCvByConfirmerTrue");
}
EntrepriseByUtilisateur(idUtilisateur : any){
  return this.http.get(this.url+"AllEntrepriseByUtilisateur/"+idUtilisateur);
  
}
AllAffaire(){
  return this.http.get(this.url+"AllAffaire");
}
AllAffaireByConfirmerTrue(){
  return this.http.get(this.url+"user/AllAffaireByConfirmerTrue");
}
addAffaire(data:any){
  return this.http.post(this.url+"user/AddAffaire",data);
}
AffaireById(id : any){
  return this.http.get(this.url+"user/AffaireById/"+id);
}
getAffaireByCategorie(idCategorie : any){
  return this.http.get(this.url+"user/AllAffaireByCategorie/"+idCategorie);
  
}
getAffaireByCategorieTrue(idCategorie : any){
  return this.http.get(this.url+"user/AllAffaireByCategorieTrue/"+idCategorie);
  
}
AffaireByUtilisateur(idUtilisateur : any){
  return this.http.get(this.url+"AllAffaireByUtilisateur/"+idUtilisateur);
  
}
AllAnnonce(){
  return this.http.get(this.url+"AllAnnonce");
}
AllAnnonceByConfirmerTrue(){
  return this.http.get(this.url+"user/AllAnnonceByConfirmerTrue");
}
addAnnonce(data:any){
  return this.http.post(this.url+"user/AddAnnonce",data);
}
AnnonceById(id : any){
  return this.http.get(this.url+"user/AnnonceById/"+id);
}
getAnnonceByCategorie(idCategorie : any){
  return this.http.get(this.url+"user/AllAnnonceByCategorie/"+idCategorie);
  
}
AnnonceByUtilisateur(idUtilisateur : any){
  return this.http.get(this.url+"AllAnnonceByUtilisateur/"+idUtilisateur);
}
ConfirmerOffreEmploiToTrue(id :any){
return this.http.delete(this.url +"confirmeToTrue/"+id);
}
ConfirmerAppelOffreToTrue(id :any){
  return this.http.delete(this.url +"confirmeAppelToTrue/"+id);
  }

  ConfirmerEntrepriseToTrue(id :any){
    return this.http.delete(this.url +"confirmeEntrepriseToTrue/"+id);
    }
  ConfirmerCvToTrue(id :any){
      return this.http.delete(this.url +"confirmeCvToTrue/"+id);
   }
  ConfirmerAffaireToTrue(id :any){
    return this.http.delete(this.url +"confirmeAffaireToTrue/"+id);
  }
  ConfirmerAnnonceToTrue(id :any){
    return this.http.delete(this.url +"confirmeAnnonceToTrue/"+id);
}
confirmerAffaire(id :any){
  return this.http.delete(this.url +"confirmeAffaireToTrue/"+id);
}
getAllUtilisateur(){
  return this.http.get(this.url+"AllUtilisateur");
}
addRating(productId: number, stars: number) {
    const ratingData = { stars }; // Créez un objet avec les données de l'évaluation
    // return this.http.post(`${this.apiUrl}/ratings/${productId}`, ratingData);
    return this.http.post(this.url +"user/ratings/"+productId,ratingData);
  }

  updateProductRating(productId: number, userRating: number): Observable<any> {
    // return this.http.post<any>(`${this.apiUrl}/${productId}/rating`, userRating);

    return this.http.post(this.url +"user/"+productId+"/ratings",userRating);
}
calculateAverageRating(idOffre : any){
  return this.http.get(this.url +"user/"+idOffre+"/average-rating");
}
submitEvaluation(offreEmploiId: number, rating: any) {
  return this.http.post(this.url +"user/"+offreEmploiId+"/evaluations",rating);
}
addEvaluationAppelOffre(appelOffreId: number, rating: any) {
  return this.http.post(this.url +"user/"+appelOffreId+"/evaluationsAppelOffre",rating);
}
addEvaluationAffaire(appelOffreId: number, rating: any) {
  return this.http.post(this.url +"user/"+appelOffreId+"/evaluationsAffaire",rating);
}
addEvaluationAnnonce(appelOffreId: number, rating: any) {
  return this.http.post(this.url +"user/"+appelOffreId+"/evaluationsAnnonce",rating);
}
}
