import { Injectable } from '@angular/core';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { NavController, ToastController, AlertController } from '@ionic/angular';

// Global config
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UpdatePersonalDataService {

constructor(public nvCtrl: NavController, private toastController: ToastController, private alertController:AlertController , private http: HTTP) { }


async UpdateCustomer(
    codigo: string,
    email: string,
    telefono:number){

      
  await this.http.get(`${environment.url}${environment.apiPath}inactivateUser?codigo=${codigo}&email=${email}&telefono=${telefono}`,"", environment.headers)
  .then(data => {
    console.log(data);
    const dataForgotTemp = JSON.parse(data.data)
    if (dataForgotTemp.response) {
      this.presentAlertRegister("¡Exelente! su solicitud se realizó con éxito");
      this.nvCtrl.navigateForward("/tabs/home");
  } else {
    console.log("Error al actualizar el cliente")
    this.presentAlert(dataForgotTemp.message);

  }

  }).catch((error) => {
  console.log("error.status");
  console.log(error)
  })

}


async presentAlert(description: string) {
  let imagen ="../assets/image/interaccion_Registro.png";
  const alert = await this.alertController.create({
    
    // header: ,
    message:`<img src="${imagen}"><br>`+description,
    cssClass: 'custom-alert',
    buttons: [
      {
        text: 'Aceptar',
        cssClass: 'alert-button-confirm', 
      },
    ],
  });


  await alert.present();
}
async presentAlertRegister(description: string) {
  let imagen ="../assets/image/interaccion_Register.png";
  const alert = await this.alertController.create({
    
    message:`<img src="${imagen}"><br>`+description,
    cssClass: 'custom-alert',
    buttons: [
      {
        text: 'Aceptar',
        cssClass: 'alert-button-confirm',
        handler: () => {
          this.nvCtrl.navigateForward("/tabs/home")
        },
      },
    ],
  });


  await alert.present();
}

}
