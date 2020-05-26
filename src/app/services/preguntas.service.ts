import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreguntasService {

  controlHeaders = 'Access-Control-Allow-Headers';
  controlMethods = 'Access-Control-Allow-Methods';
  controlOrigin = 'Access-Control-Allow-Origin';

  constructor( private http: HttpClient ) {
    console.log('Preguntas listas');
   }

   getPreguntas() {

     const url = 'http://localhost:8080/WebPreguntas/webresources/pregunta/obtenerPreguntas';
     const headers = new HttpHeaders({
      'Content-Type':  'application/json',
    'Access-Control-Allow-Credentials' : 'true',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
     });

     return this.http.get(url, {headers});
    }

    postTaller(json: JSON) {

      console.log('Si entro al servicio post');
      console.log(json);

      const url = 'http://localhost:8080/WebRespuestas/webresources/respuesta/agregarRespuesta';

      const params = json;


      //const headers = new HttpHeaders().set('Content-Type', 'raw');


      /*const headers = new HttpHeaders({
       'Content-Type':  'application/json',
     'Access-Control-Allow-Credentials' : 'true',
     'Access-Control-Allow-Origin': '*',
     'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
     'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
      });*/

      return this.http.post(url, params, {responseType: 'text'});

      /*
      .subscribe((data: any) => {
      this.preguntasArr = data;
      this.preguntasArr.forEach(element => {
      });
    }, ( errorServicio ) => {
      console.log('Error');
   }); */
     }
}
