import { Component, OnInit } from '@angular/core';
import { PreguntasService } from '../../services/preguntas.service';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

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
  idUser: any;

  chk;

  form: FormGroup;

  constructor(private fb: FormBuilder, private preguntas: PreguntasService,
              private router: Router, private activeRoute: ActivatedRoute ) {

    this.activeRoute.params.subscribe( params => {
      this.idUser = params['id'];
    });

    this.preguntas.getPreguntas()
    .subscribe((data: any) => {
      this.preguntasArr = data;
      this.preguntasArr.forEach(element => {
      });
    }, ( errorServicio ) => {
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
    });
  }

  habilitar() {
    this.chk = !this.chk;
  }

  onCheckboxChange(e) {
    const checkArray: FormArray = this.form.get('checkArray') as FormArray;

    if (e.target.checked) {

      this.respuestasArray.push({
        id_pregunta: e.target.id,
        id_usuario: this.idUser,
        res: e.target.value
      });

      this.jsonObject = JSON.parse(JSON.stringify(this.respuestasArray));


      checkArray.push(new FormControl(e.target.id));

    } else {
      let i = 0;
      var obj = Object.keys(this.jsonObject).length;


//Cambio de check
      for (let index = 0; index < obj; index++) {
        if (this.jsonObject[index].id_pregunta === e.target.id) {
            this.jsonObject[index].value = e.target.value;
        }
      }
  }

  }
  ngOnInit() {
  }

}
