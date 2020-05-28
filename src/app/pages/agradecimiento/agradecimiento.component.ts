import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-agradecimiento',
  templateUrl: './agradecimiento.component.html',
  styleUrls: ['./agradecimiento.component.css']
})
export class AgradecimientoComponent implements OnInit {

  taller: string;

  constructor(private activeRoute: ActivatedRoute,
              private router: Router) {
              this.activeRoute.params.subscribe( params => {
                this.taller = params['taller'];
              });
               }

  ngOnInit() {
  }

  cerrarSesion() {
    this.router.navigate(['/login']);
  }

}
