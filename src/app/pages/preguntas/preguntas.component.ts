import { Component, OnInit } from '@angular/core';
import { PreguntasService } from '../../services/preguntas.service';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css']
})
export class PreguntasComponent implements OnInit {

  preguntasArr: any[] = [];
  respuestasArray: any[] = [];
  jsonObject: JSON;
  datos: string;

  chk;

  form: FormGroup;

  constructor(private fb: FormBuilder, private preguntas: PreguntasService,
              private router: Router ) {

    this.preguntas.getPreguntas()
    .subscribe((data: any) => {
      this.preguntasArr = data;
      this.preguntasArr.forEach(element => {
      });
    }, ( errorServicio ) => {
      console.log('Error');
   });

    this.form = this.fb.group({
     checkArray: this.fb.array([])
   });

  }

  guardar() {
    console.log(this.jsonObject);
    this.preguntas.postTaller(this.jsonObject).subscribe((data: string) => {
      this.datos = data;
      this.router.navigate( ['/agradecimiento', this.datos] );
      console.log(this.datos);
    });
  }

  habilitar() {
    this.chk = !this.chk;
  }

  onCheckboxChange(e) {
    const checkArray: FormArray = this.form.get('checkArray') as FormArray;

    console.log(e.target.checked);

    if (e.target.checked) {

      console.log('Entro aqui');

      this.respuestasArray.push({
        id_pregunta: e.target.id,
        id_usuario: 3,
        res: e.target.value
      });

      this.jsonObject = JSON.parse(JSON.stringify(this.respuestasArray));


      checkArray.push(new FormControl(e.target.id));

    } else {
      let i = 0;
      var obj = Object.keys(this.jsonObject).length;
      console.log(obj);
      for (let index = 0; index < obj; index++) {
        console.log(this.jsonObject[index].id_pregunta);
        if (this.jsonObject[index].id_pregunta === e.target.id) {
            console.log('Es igual el id hermano');
            this.jsonObject[index].value = e.target.value;
        }
      }
  }

  }



  ngOnInit() {
  }

}
