import { Injectable } from '@angular/core';
import axios from 'axios';

import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SupportService {

constructor(
  public http: HTTP
) { }
public support = new Array;
public questionsFrecuents = new Array;

//SOPORTE
async supportCashback() {

  await this.http.get(`${environment.url}${environment.apiPath}getSupport`, "",environment.headers).then(data => {
    console.log(data);
    const dataObjTemp = JSON.parse(data.data)

    if (dataObjTemp.response) {
      console.log(dataObjTemp.data)
      this.support = dataObjTemp.data;
      console.log(this.support)

    }
    else{
      console.log("Ocurrío un error al traer las preguntas de soporte");
    }
  }).catch((error) => {
  console.log("error.status");
  console.log(error)
  })
}
public supportCash(): Object {
  this.support;
  return this.support;
}
//PREGUNTAS FRECUENTES
async Frequentquestions() {

  await this.http.get(`${environment.url}${environment.apiPath}getFrequentquestions`, "",environment.headers).then(data => {
    const dataObjTemp = JSON.parse(data.data)

    if (dataObjTemp.response) {
      console.log(dataObjTemp.data)
      this.questionsFrecuents = dataObjTemp.data;
    }
    else{
      console.log("Ocurrío un error al traer las preguntas frecuentes");
    }
  }).catch((error) => {
  console.log("error.status");
  console.log(error)
  })
}
public questions(): Object {
  this.questionsFrecuents;
  return this.questionsFrecuents;
}

}
