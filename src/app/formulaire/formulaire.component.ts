import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from '../service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/compat/storage';


@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.scss']
})
export class FormulaireComponent implements OnInit {


  editorContent: string = '';
  user: any;
  loading : boolean=false
  loginData: any;
  id: any;
  formgroup: any;
  submitted: boolean=false;
  stringl : any
  path : any;
  public imgfile : any = File;
  listCategorie: any;
  role: any;
  donne: any;
  minDate: string;
  user1 :any | null
  constructor(private service : ServiceService,public formBuilder: FormBuilder,private router: Router,
    private storage: AngularFireStorage) {this.minDate = new Date().toISOString().split('T')[0]; }

  ngOnInit(): void {
  
   this.GetCategorie()
   this.user1 = sessionStorage.getItem('isLogin');
   this.user = JSON.parse(this.user1);
   if(this.user !== null){
    this.loginData=this.user
    console.log(this.loginData)
    this.role=this.loginData.roles
      this.role.forEach((role: any) => {
        console.log(role);
        this.donne=role
        console.log(this.donne);
        
      });
  
  }

   this.id=this.loginData?.id;
  //   if(localStorage["loginStatus"]){
  //     this.loginStatus=JSON.parse(localStorage["loginStatus"]);
  //   }
    this.formgroup = this.formBuilder.group({

      nomOffre: ['', [Validators.required,]],
      email: ['', Validators.required],
      localisation: ['', Validators.required],
      typeOffre: ['', Validators.required],
      description: ['',[Validators.required,]],
      urlCandidature: ['', Validators.required],
      dateFonction: ['', []],
    
      dateLimite: ['', Validators.required],
      nomEntreprise: ['', Validators.required],
      // site: ['',[ Validators.pattern('^$|^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$')] ],
      site: ['', [Validators.pattern('^(https?|ftp):\\/\\/[\\w\\d.-]+\\.[a-zA-Z]{2,}(\\S*)$')]],
      urlFacebook: ['', [Validators.pattern('^(https?|ftp):\\/\\/[\\w\\d.-]+\\.[a-zA-Z]{2,}(\\S*)$')]],
      urlTwitter: ['', [Validators.pattern('^(https?|ftp):\\/\\/[\\w\\d.-]+\\.[a-zA-Z]{2,}(\\S*)$')]],
      urlLinkdin: ['', [Validators.pattern('^(https?|ftp):\\/\\/[\\w\\d.-]+\\.[a-zA-Z]{2,}(\\S*)$')]],
      logo: ['', []],
      categorie: ['', Validators.required],
      utilisateur: ['', Validators.required],
      //confirmPassword: ['', Validators.required],
      //acceptTerms: [false, Validators.requiredTrue] //Checkbox For accept conditions 
  },);
  this.formgroup.patchValue({
    email: this.user?.email
  });
 
  }
  moi(){
    console.log("moi")
    this.uploadSave(this.imgfile).then(() =>{})
  }

  async uploadimg(event: any){
    this.imgfile = event.target.files[0];
  }

  async uploadSave(file1: any){
    if(file1){
       this.path = `offreEmploi/${file1.name}`
      const uploadTask = await this.storage.upload(this.path, file1)
       this.stringl = await uploadTask.ref.getDownloadURL()
      // this.gerant.photo = stringl
      console.log(this.path);
    }
  }

  get registerFormControl() {
    return this.formgroup.controls;
  }

  ajouterOffre(fg : FormGroup){
    this.loading=true
    this.submitted=true;
    
    console.log(this.formgroup)
    // if (this.formgroup.valid) {
    
      
      // fg.value.categorie={
      //   "id": fg.value['categorie'], 
      // }
     
      fg.value.utilisateur={
        "id": this.id,
      };
      console.log(fg.value);
      if (this.formgroup.get('nomOffre').valid && this.formgroup.get('email').valid && this.formgroup.get('localisation').valid 
      && this.formgroup.get('typeOffre').valid && this.formgroup.get('description').valid && this.formgroup.get('urlCandidature').valid 
      && this.formgroup.get('dateLimite').valid && this.formgroup.get('nomEntreprise').valid && this.formgroup.get('categorie').valid
      && this.formgroup.get('site').valid && this.formgroup.get('urlFacebook').valid && this.formgroup.get('urlTwitter').valid && this.formgroup.get('urlLinkdin').valid) {
        
      this.uploadSave(this.imgfile).then(() =>{
          fg.value.logo = this.stringl
          fg.value.path=this.path

      console.log(fg.value.logo)
        this.service.addOffreEmploi(fg.value).subscribe((data)=>{
          if(data){
            console.log("bien")
           
           this.loading=false
            this.service.presentToast("Offre ajouter avec succès. Veuillez attendre la confirmation de l'administrateur.")
           
            setTimeout(() => {
              location.replace("/formulaire");
            }, 4000);
        }else{
          console.log("probleme image") 
        }
        }, err => {
          // this.errorMessage = err.error.message
          // console.log("Selectionné une image")
          this.service.presentToastError(err.error.message);
          this.loading=false
        })
      }, err => {
        // this.errorMessage = err.error.message
        console.log("Erreur image")
        this.service.presentToastError("Erreur image")
        this.loading=false
        // this.toast.error("Selectionné une image");
      }
      )
    }else{
      this.service.presentToastError("merci de renseigner les champs obligatoire")
      this.loading=false
    }
  // }
  }

  GetCategorie(){
    this.service.getCategorie().subscribe((data)=>{
      this.listCategorie=data
      console.log(this.listCategorie)
    })
  }
  stripHtml(html: string): string {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  }
}
