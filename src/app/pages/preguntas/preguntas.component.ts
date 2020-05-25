import { Component, OnInit } from '@angular/core';
import { PreguntasService } from '../../services/preguntas.service';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css']
})
export class PreguntasComponent implements OnInit {

  preguntasArr: any[] = [];

  constructor( private preguntas: PreguntasService ) {

    this.preguntas.getPreguntas()
    .subscribe((data: any) => {
      this.preguntasArr = data;
      this.preguntasArr.forEach(element => {
      });
    }, ( errorServicio ) => {
      console.log('Error');
   });

  }

  ngOnInit() {
  }

}
