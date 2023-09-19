import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/compat/storage';
// declare var tinymce: any;
@Component({
  selector: 'app-ajoutannonce',
  templateUrl: './ajoutannonce.component.html',
  styleUrls: ['./ajoutannonce.component.scss']
})
export class AjoutannonceComponent implements OnInit {
 
  user: any;
  loginData: any;
  id: any;
  formgroup: any;
  submitted: boolean=false;
  stringl : any
  public imgfile : any = File;
  categorieAnnonce: any;
  path : any
  loading : boolean=false
  constructor(private service : ServiceService,public formBuilder: FormBuilder,private router: Router,
    private storage: AngularFireStorage) { }
    fields: any[] = []; // Tableau pour stocker les champs

  

  ngOnInit(): void {
    // tinymce.init({
    //   selector: 'textarea#mytextarea', // Sélecteur de l'élément textarea
    //   plugins: 'autolink lists link', // Plugins que vous souhaitez activer
    //   toolbar: 'undo redo | styleselect | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | link | bullist numlist outdent indent | removeformat | subscript superscript | forecolor backcolor | fontsizeselect | code',
    //   height: 300,
    //   content_style: 'body { font-family: Arial, sans-serif; text-align: justify; }'
    // });
   this.GetCategorie()
    const user: any | null = sessionStorage.getItem('isLogin');
    this.user = JSON.parse(user);
    if(this.user !== null){
      this.loginData=this.user
      console.log(this.loginData)
    }
   this.id=this.loginData?.id;
  //   if(localStorage["loginStatus"]){
  //     this.loginStatus=JSON.parse(localStorage["loginStatus"]);
  //   }
    this.formgroup = this.formBuilder.group({

      titre: ['', [Validators.required,]],
      ville: ['', Validators.required],
      adresse: ['', Validators.required],
      contenu: ['',[Validators.required,]],
      nom: ['', Validators.required],
      email: ['', Validators.required],
      telephone: ['', [Validators.required,]],
      boite: ['', [Validators.required,]],
      prix: ['', [Validators.required,]],
      categorieAnnonce: ['', [Validators.required,]],
      image: ['', Validators.required],
      //confirmPassword: ['', Validators.required],
      //acceptTerms: [false, Validators.requiredTrue] //Checkbox For accept conditions 
  },);
  
  }
  
  moi(){
    console.log("moi")
  }

  async uploadimg(event: any){
    this.imgfile = event.target.files[0];
    if (this.imgfile.type !== undefined && this.imgfile.type.startsWith('image/')) {
    }else{
      this.imgfile = undefined;
      this.service.presentToastError("Erreur :  Le fichier photo doit être une image.")
      }
  }

  async uploadSave(file1: any){
    if(file1){
      this.path = `annonce/${file1.name}`
      const uploadTask = await this.storage.upload(this.path, file1)
       this.stringl = await uploadTask.ref.getDownloadURL()
      // this.gerant.photo = stringl
      // console.log(this.gerant.photo);
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
      // const descriptionEditor = tinymce.get('mytextarea');
      // if (descriptionEditor) {
      //    const descriptionValue = descriptionEditor.getContent(); // Contenu HTML complet
      //    this.formgroup.get('contenu').setValue(descriptionValue.trim());
      // }
    fg.value.utilisateur={
      "id": this.id,
     
    };
      // fg.value.categorieAnnonce={
      //   "id": fg.value['categorieAnnonce'], 
      // }
      if (this.formgroup.get('nom').valid && this.formgroup.get('ville').valid && this.formgroup.get('email').valid && this.formgroup.get('adresse').valid
      && this.formgroup.get('contenu').valid && this.formgroup.get('titre').valid 
      && this.formgroup.get('telephone').valid && this.formgroup.get('categorieAnnonce').valid && this.formgroup.get('prix').valid) {
        if(this.user !== null){
      this.uploadSave(this.imgfile).then(() =>{
          fg.value.image = this.stringl
          fg.value.path = this.path
      console.log(fg.value.logo)
        this.service.addAnnonce(fg.value).subscribe((data)=>{
          if(data){
            console.log("bien")
            this.service.presentToast("Entreprise ajouter avec succès")
            location.replace("/ajoutannonce")
            this.loading=false
        }else{
          console.log("probleme image") 
          this.loading=false
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
      this.service.presentToastError("merci de vous connecter")
      this.loading=false
    }
    }else{
      this.service.presentToastError("merci de renseigner les champs obligatoire")
      this.loading=false
    }
  // }
  }

  GetCategorie(){
    this.service.getCategorieAnnonce().subscribe((data)=>{
      this.categorieAnnonce=data
      console.log(this.categorieAnnonce)
    })
  }

}
