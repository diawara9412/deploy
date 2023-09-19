import { Component, OnInit } from '@angular/core';

import { ServiceService } from '../service.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-detailcv',
  templateUrl: './detailcv.component.html',
  styleUrls: ['./detailcv.component.scss']
})
export class DetailcvComponent implements OnInit {
  id :any
  list :any
  img1 :any
  loginData :any ="non"
  formation :any
  formations :any
  experience :any
  experiences :any
  donne: any;
  donne1: any;
  constructor(private service : ServiceService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.service.CvById(this.id).subscribe((data)=>{

     this.list=data
     if(this.list !== null){
      this.formation=this.list
      console.log(this.loginData)
      this.formations=this.formation.formations
      this.experiences=this.formation.cvexperiences
        this.formations.forEach((forma: any) => {
          console.log(forma);
          this.donne=forma
          console.log(this.donne);
          
        });
        this.experiences.forEach((forma: any) => {
          console.log(forma);
          this.donne1=forma
          console.log(this.donne1);
          
        });
    
    }
     console.log(this.list)
    })
    if(localStorage["isLogin"]){
      this.loginData=JSON.parse(localStorage["isLogin"]);
    }
  }


}
