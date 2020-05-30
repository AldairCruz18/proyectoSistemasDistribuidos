import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../models/usuario.models';
import { PreguntasService } from '../../services/preguntas.service';
import { Md5 } from 'ts-md5/dist/md5';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel;

  user: string;
  password: any;
  userReturn: any;

  show: boolean = false;
  alerta: string;
  mensaje: string = '';

  constructor( private preguntas: PreguntasService, private router: Router ) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
  }

  login( form: NgForm ) {
    console.log(form);
    if (form.invalid) {
      return;
    }

    const md5 = new Md5();

    this.user = form.form.value.email;
    this.password = md5.appendStr(form.form.value.pass).end();

    this.preguntas.getUser(this.user, this.password)
    .subscribe((data: any) => {
      this.userReturn = data;
      if (this.userReturn['id'] === null) {
        this.mensaje = 'Usuario y/o contraseña incorrectos, verifique.';

        this.alerta = 'alert-danger';
        this.show = true;

        setTimeout(function() {
        this.show = false;
      }.bind(this), 3000);
      } else {
        this.router.navigate( ['/home', this.userReturn['id']] );
      }
    }, ( errorServicio ) => {
      console.log('Error');
   });
  }

}
