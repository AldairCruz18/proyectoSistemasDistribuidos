import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../models/usuario.models';
import { Md5 } from 'ts-md5/dist/md5';
import { PreguntasService } from '../../services/preguntas.service';
import { format } from 'url';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;
  json: string;
  jsonObject: JSON;
  show: boolean = false;
  alerta: string;
  datos: JSON;
  mensaje: string = '';
  guardado: boolean = false;
  formGeneral: NgForm;

  constructor( private router: Router, private preguntasService: PreguntasService ) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
  }

  onSubmit( form: NgForm ) {
    this.formGeneral = form;
    if (form.invalid) { return; }

    const md5 = new Md5();

    this.json = JSON.stringify({
      email: form.form.value.email,
      last_name: form.form.value.apellidos,
      password: md5.appendStr(form.form.value.password).end(),
      name: form.form.value.name
    });

    this.jsonObject = JSON.parse(this.json);

    this.guardarUsuario();

  }

  guardarUsuario() {
    this.preguntasService.postUser(this.jsonObject).subscribe((data: string) => {
      this.datos = JSON.parse(data);

      this.mensaje = this.datos['message'];

      if (this.mensaje === 'El usuario ha sido guardado exitosamente') {
        this.guardado = true;
      } else {
        this.guardado = false;
      }

      this.guardadoEstatus();
    });

  }

  guardadoEstatus() {
    if (this.guardado) {
      this.alerta = 'alert-success';
      this.show = true;

      this.limpiarCampos();

      setTimeout(function() {
        this.show = false;
        this.router.navigate( ['/login'] );
      }.bind(this), 5000);
    } else if (!this.guardado) {
      this.alerta = 'alert-danger';
      this.show = true;

      setTimeout(function() {
        this.show = false;
      }.bind(this), 5000);
    }
  }

  limpiarCampos() {
    this.usuario.email = '';
    this.usuario.name = '';
    this.usuario.password = '';
    this.usuario.apellidos = '';
    this.formGeneral.resetForm();
  }

}
