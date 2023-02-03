import { Injectable } from '@angular/core';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';

import { NavController, ToastController,AlertController } from '@ionic/angular';

// Connect with http
import axios from 'axios';

// Global config
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PollService {
  public arrayCuestions = new Array;

constructor(public nvCtrl: NavController, private toastController: ToastController, private http: HTTP,public alertController:AlertController ) { }

  async Questions() {

    await this.http.get(`${environment.url}${environment.apiPath}getSurvey`,"", environment.headers).then(data => {
      
      
      const dataLoginTemp = JSON.parse(data.data)

      if (dataLoginTemp.data) {
        this.arrayCuestions=dataLoginTemp.data;
      } else {
        console.log(dataLoginTemp.message);
        console.log("error al traer la encuesta");
      }

    }).catch((error) => {
      console.log("error.status");
      console.log(error)
    })

  }
  public dataQuestions(): Object {
    this.arrayCuestions;
    return this.arrayCuestions;
  }

  async ResponseQuestions(idVendedor : string, question1: string ,question2 : string, question3: string, idQuestion1: string, idQuestion2: string, idQuestion3: string) {


    await this.http.get(`${environment.url}${environment.apiPath}answerSurvey?idVendedor=${idVendedor}&answers={"${idQuestion1}":"${question1}","${idQuestion2}":"${question2}","${idQuestion3}":"${question3}"}`,"", environment.headers)
    .then(data => {

      const dataLoginTemp = JSON.parse(data.data)
      if (dataLoginTemp.data) {
        console.log(data);
      } else {
        console.log(data.data.message);
      }

    }).catch((error) => {
      console.log("error.status");
      console.log(error)
    })

  }

  async presentAlert(description: string) {
    let imagen ="../assets/image/interaccion_Ingreso.png";
    const alert = await this.alertController.create({
      
      message:`<img src="${imagen}"><br>`+description,
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'Aceptar',
          cssClass: 'alert-button-confirm',
          handler: () => {
            this.nvCtrl.navigateForward("/home");
          },
        },
      ],
    });


    await alert.present();
  }

}
