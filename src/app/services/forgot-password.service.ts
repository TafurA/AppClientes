import { Injectable } from '@angular/core';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { ToastController, LoadingController, NavController, AlertController } from '@ionic/angular';
// Connect with http
import axios from 'axios';

// Global config
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})

export class ForgotPasswordService {

  public isCredentialFull: boolean = false;
  private userEmail: string;
  public alert;

  constructor(
    public nvCtrl: NavController,
    public toastController: ToastController,
    public loadingController: LoadingController,
    public http: HTTP,
    private alertController: AlertController,
  ) { }

  async serviceCredentialValidate(id: string) {


    await this.http.get(`${environment.url}${environment.apiPath}Forgotpassword?identificacion=${id}`, "", environment.headers)
      .then(data => {
        const dataObjTemp = JSON.parse(data.data)

        if (dataObjTemp.response) {
          console.log("DATA")
          console.log(dataObjTemp)
          this.presentAlert("¡Código enviado exitosamente!", dataObjTemp.message, 'is-success')
          this.isCredentialFull = true;
          this.userEmail = dataObjTemp.datos
        } else {
          this.presentAlert("¡Ups!", "No se reconoce el usuario", 'is-error')
        }

        return dataObjTemp

      })
      .catch(error => {
        console.log("error Forgotpassword");
        console.log(error);
      });

  }

  // Return email and true if the code has send succesfuly
  public confirmData(): Object {
    return [this.isCredentialFull, this.userEmail];
  }

  async serviceSecurityCodeValidate(securityCode, userEmail) {
    // await axios.get(`${environment.apiPath}/Verification?codigo=${securityCode}&email=${userEmail}`,
    //   environment.headerConfig).then(response => {

    //     if (response.data.response) {
    //       this.nvCtrl.navigateForward("/updated-password")
    //     } else {
    //       this.presentToast("TITUTLO", response.data.message, "is-error")
    //     }

    //   }).catch((error) => {
    //     console.log("error.status");
    //     console.log(error)
    //   })

    await this.http.get(`${environment.url}${environment.apiPath}Verification?codigo=${securityCode}&email=${userEmail}`, "", environment.headers)
      .then(data => {
        const dataObjTemp = JSON.parse(data.data)

        if (dataObjTemp.response) {
          this.nvCtrl.navigateForward("/tabs/updated-password")
        } else {
          this.presentAlert("Error Recuperando clave", dataObjTemp.message, "is-error")
        }

        return dataObjTemp

      })
      .catch(error => {
        console.log("error Verification");
        console.log(error);
      });
  }

  async serviceUpdatePassword(securityCode: string, newPassword: string) {
    // await axios.get(`${environment.apiPath}/Changepassword?codigo=${securityCode}&passd=${newPassword}`,
    //   environment.headerConfig).then(response => {

    //     if (response.data.response) {

    //     } else {
    //     }

    //   }).catch((error) => {
    //     console.log("error.status");
    //     console.log(error)
    //   })

    await this.http.get(`${environment.url}${environment.apiPath}Changepassword?codigo=${securityCode}&passd=${newPassword}`, "", environment.headers)
      .then(data => {
        const dataObjTemp = JSON.parse(data.data)

        if (dataObjTemp.response) {
          this.presentAlert('Contraseña actualizada', dataObjTemp.message, 'is-success')
          this.nvCtrl.navigateForward('/tabs/login')
          localStorage.removeItem('credentialUser');
        } else {
          this.presentAlert('Error al actualizar contraseña', dataObjTemp.message, 'is-error')
        }

        return dataObjTemp

      })
      .catch(error => {
        console.log("error Changepassword");
        console.log(error);
      });
  }

  async presentAlert(title: string, description: string, alertType: string) {
    this.alert = await this.alertController.create({
      header: title,
      subHeader: description,
      cssClass: `c-alert ${alertType}`
      // buttons: ['OK'],
    });

    await this.alert.present();

    setTimeout(() => {
      this.alert.dismiss()
    }, 2000)
  }

}
