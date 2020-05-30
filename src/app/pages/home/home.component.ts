import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  usuario: any;

  constructor( private router: Router, private activeRoute: ActivatedRoute ) {
    this.activeRoute.params.subscribe( params => {
      this.usuario = params['id'];
    });
   }

  ngOnInit() {
  }

  iniciarPreguntas() {
    this.router.navigate( ['/preguntas', this.usuario] );
  }

}
