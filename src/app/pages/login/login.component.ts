import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../models/usuario.models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel;

  constructor() { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
  }

  login( form: NgForm ) {
    if (form.invalid) {
      return;
    }

    console.log(form);
    console.log(form.form.value);
    console.log(form.form.value.email);
    console.log(form.form.value.pass);

    console.log("Entro");
  }

}
