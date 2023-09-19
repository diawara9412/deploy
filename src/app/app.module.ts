import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AccueilComponent } from './accueil/accueil.component';
import { DetailComponent } from './detail/detail.component';
import { LoginComponent } from './login/login.component';
import { SideComponent } from './side/side.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { FormulaireComponent } from './formulaire/formulaire.component';
import { AjoutappelComponent } from './ajoutappel/ajoutappel.component';
import { AppelofreComponent } from './appelofre/appelofre.component';
import { OffreemploiComponent } from './offreemploi/offreemploi.component';
import { ContactComponent } from './contact/contact.component';
import { EmployeurComponent } from './employeur/employeur.component';
import { AuthInterceptor } from './AuthInterceptor';
import { JwtModule } from '@auth0/angular-jwt';
import { AngularFireModule } from '@angular/fire/compat/';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from '../environments/environment';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateoffreComponent } from './updateoffre/updateoffre.component';
import { UpdateappelComponent } from './updateappel/updateappel.component';
import { DetailappelComponent } from './detailappel/detailappel.component';
import { DetailppelComponent } from './detailppel/detailppel.component';
import { ProfileComponent } from './profile/profile.component';
import { AjoutCVComponent } from './ajout-cv/ajout-cv.component';
import { ListeCVComponent } from './liste-cv/liste-cv.component';
import { AjoutentreComponent } from './ajoutentre/ajoutentre.component';
import { ListeEntrepComponent } from './liste-entrep/liste-entrep.component';
import { DetailcvComponent } from './detailcv/detailcv.component';
import { EntrepriseComponent } from './entreprise/entreprise.component';

import { AffaireComponent } from './affaire/affaire.component';
import { AjoutaffComponent } from './ajoutaff/ajoutaff.component';
import { AnnonceComponent } from './annonce/annonce.component';
import { AjoutannonceComponent } from './ajoutannonce/ajoutannonce.component';
import { DetailaffComponent } from './detailaff/detailaff.component';
import { DetailannComponent } from './detailann/detailann.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SlideComponent } from './slide/slide.component';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { EditorModule } from 'primeng/editor';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CarousselComponent } from './caroussel/caroussel.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ButtonModule } from 'primeng/button';
import { NgxMarqueeModule } from 'ngx-marquee';
import { ToastModule } from 'primeng/toast';
const storage: any | null = sessionStorage.getItem('TOKEN');
const accessToken = JSON.parse(storage);
const authToken = accessToken;

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AccueilComponent,
    DetailComponent,
    LoginComponent,
    SideComponent,
    InscriptionComponent,
    FormulaireComponent,
    AjoutappelComponent,
    AppelofreComponent,
    OffreemploiComponent,
    ContactComponent,
    EmployeurComponent,
    UpdateoffreComponent,
    UpdateappelComponent,
    DetailappelComponent,
    DetailppelComponent,
    ProfileComponent,
    AjoutCVComponent,
    ListeCVComponent,
    EntrepriseComponent,
    ListeEntrepComponent,
    DetailcvComponent,
    AjoutentreComponent,
    AffaireComponent,
    AjoutaffComponent,
    DetailannComponent,
    DetailaffComponent,
    AjoutannonceComponent,
    AnnonceComponent,
    SlideComponent,

    CarousselComponent,
  


 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    ToastModule,
    ReactiveFormsModule,
    CarouselModule.forRoot(),
    ButtonModule,
    NgxMarqueeModule,
    AngularEditorModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    EditorModule,
    NgxStarRatingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return authToken;
        }
      }
    }),

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
