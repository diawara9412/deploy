import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.scss']
})
export class UtilisateurComponent implements OnInit {
  list : any
  taille : any
  constructor(private service: ServiceService) { }

  ngOnInit(): void {
    this.service.getAllUtilisateur().subscribe((data)=>{
    this.list=data
    console.log(this.list);
    this.taille=this.list.length
    })
  }

}
