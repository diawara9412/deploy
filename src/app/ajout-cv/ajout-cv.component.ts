import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
// declare var tinymce: any;
@Component({
  selector: 'app-ajout-cv',
  templateUrl: './ajout-cv.component.html',
  styleUrls: ['./ajout-cv.component.scss']
})
export class AjoutCVComponent implements OnInit {
  user: any;
  loginData: any;
  id: any;
  formgroup: any;
  submitted: boolean=false;
  stringl : any
  public imgfile : any = File;
  public file : any = File;
  listCategorie: any;
  path : any
  pathFile :any
  cvFile :any
  minDate: string;
  loading : boolean=false
  constructor(private service : ServiceService,public formBuilder: FormBuilder,private router: Router,
    private storage: AngularFireStorage) { this.minDate = new Date().toISOString().split('T')[0];}
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
      formations: this.formBuilder.array([]) ,
      cvexperiences :this.formBuilder.array([]) ,
      urls : this.formBuilder.array([]) ,
      nom: ['', [Validators.required,]],
      localisation: ['', Validators.required],
      email: ['', Validators.required],
      categorie: ['', [Validators.required,]],
      titrepro: ['', [Validators.required,]],
      telephone: ['', [Validators.required,]],
      contenu: ['', [Validators.required,]],
      categorieAppel: ['', [Validators.required,]],
      photo: ['', Validators.required],
      fichier: ['', Validators.required],
      //confirmPassword: ['', Validators.required],
      //acceptTerms: [false, Validators.requiredTrue] //Checkbox For accept conditions 
  },);
  this.formgroup.patchValue({
    email: this.user?.email
  });
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
  async uploadFile(event: any){
    this.file = event.target.files[0];
    if (this.file.type === 'application/pdf' || this.file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    } else {
      this.file = undefined;
      this.service.presentToastError("Erreur : Le fichier doit être au format DOCX ou PDF.")
    }
  }
  async uploadsaveDoc(file: any) {
    if (file) {
    
        this.path = `Documents/${file.name}`;
        const uploadTask = await this.storage.upload(this.path, file);
        this.cvFile = await uploadTask.ref.getDownloadURL();
        console.log('URL du document :', this.cvFile);
      
    }
  }

  async uploadSave(file1: any){
    if(file1){
    
      this.path = `photos/${file1.name}`
      const uploadTask = await this.storage.upload(this.path, file1)
       this.stringl = await uploadTask.ref.getDownloadURL()
      // this.gerant.photo = stringl
      // console.log(this.gerant.photo);
      }

  }
  get registerFormControl() {
    return this.formgroup.controls;
  }

  ajouterCv(fg : FormGroup){
    this.loading=true
    this.submitted=true;
    
    console.log(fg.value)
    // if (this.formgroup.valid) {
      // const descriptionEditor = tinymce.get('mytextarea');
      // if (descriptionEditor) {
      //    const descriptionValue = descriptionEditor.getContent(); // Contenu HTML complet
      //    this.formgroup.get('contenu').setValue(descriptionValue.trim());
      // }
    fg.value.utilisateur={
      "id": this.id
    };
    
      // fg.value.categorie={
      //   "id": fg.value['categorie'], 
      // }
 
      if (this.formgroup.get('nom').valid && this.formgroup.get('email').valid && this.formgroup.get('categorie').valid 
      && this.formgroup.get('localisation').valid && this.formgroup.get('telephone').valid && this.formgroup.get('titrepro').valid ) {

        if(this.user !== null){
      this.uploadSave(this.imgfile).then(() =>{
          fg.value.photo = this.stringl
          
      this.uploadsaveDoc(this.file).then(()=>{
        fg.value.fichier = this.cvFile
        this.service.AddCv(fg.value).subscribe((data)=>{
          if(data){
        
            console.log(data)
            this.path=data
            console.log(this.path.id);
         
           
              
                console.log(data);
                console.log(fg.value);
                this.service.presentToast("Offre ajouter avec succès")
              location.replace("/ajoutCV")
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
        console.log("Erreur Cv")
        this.service.presentToastError("Erreur CV")
        this.loading=false
        // this.toast.error("Selectionné une image");
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
  // }else{
  //   this.service.presentToastError("La date de fin ne doit pas être inferieure à la date de debut")
  //   this.loading=false
  // }
  // }
  }

  GetCategorie(){
    this.service.getCategorie().subscribe((data)=>{
      this.listCategorie=data
      console.log(this.listCategorie)
    })
  }
  ajouterFormation(): void {
    const formations = this.formgroup.get('formations') as FormArray;
    formations.push(this.createFormation());

    
  }
  ajouterExperience(): void {
    const experiences = this.formgroup.get('cvexperiences') as FormArray;
    experiences.push(this.createExperience());

  }
  ajouterUrl(): void {
    const urls = this.formgroup.get('urls') as FormArray;
    urls.push(this.createUrl());

    
  }
  // Méthode pour supprimer un utilisateur
  supprimerFormation(index: number): void {
    const formations = this.formgroup.get('formations') as FormArray;
    formations.removeAt(index);
  }
  supprimerExperience(index: number): void {
    const experiences = this.formgroup.get('cvexperiences') as FormArray;
    experiences.removeAt(index);
  }
  supprimerUrl(index: number): void {
    const urls = this.formgroup.get('urls') as FormArray;
    urls.removeAt(index);
  }
  // Créer un groupe de formulaire pour chaque utilisateur
  createFormation(): FormGroup {
    return this.formBuilder.group({
      nomEtablissement: ['', Validators.required],
      diplome: ['', Validators.required],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      
    });
  }
  createUrl(): FormGroup {
    return this.formBuilder.group({
      nom: ['', Validators.required],
      url: ['', Validators.required],

    });
  }
  createExperience(): FormGroup {
    return this.formBuilder.group({
      employeur: ['', Validators.required],
      poste: ['', Validators.required],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
    });
  }

  ajouter(fg : FormGroup){
     console.log(fg.value);
     
  }
}
