import { Injectable } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';

// Connect with http
import axios from 'axios';
import { SessionGuard } from 'src/app/guard/session.guard';
import { environment } from 'src/environments/environment';

// Global config

@Injectable({
  providedIn: 'root',
})

export class LoginService {

  public ProcessDataUserSession = {};

  constructor(public nvCtrl: NavController, private toastController: ToastController, public sessionGuard: SessionGuard, private http: HTTP) {
  }

  async loginToSystem(user: string, pass: string) {

    await this.http.get(`${environment.url}${environment.apiPath}authenticateClient?login=${user}&clave=${pass}`, "", environment.headers)
      .then(data => {

        const dataLoginTemp = JSON.parse(data.data)

        if (dataLoginTemp.response) {
          this.saveDataIntoLocalStorage(atob(dataLoginTemp.dataSession))

          setTimeout(() => {
            this.setUserCode()
          }, 1000)

          console.log("dataLoginTemp")
          // Address
          console.log(dataLoginTemp.data)
          if (dataLoginTemp.data.length > 1) {
            const listAddress = []

            dataLoginTemp.data.forEach(element => {
              const dataTempAddress = {
                codcli_b: element.codcli_b,
                dircli_b: element.dircli_b,
                telcli_b: element.telcli_b
              }

              listAddress.push(dataTempAddress)
            });

            localStorage.setItem("AddressList", JSON.stringify(listAddress))
          } else {
            localStorage.setItem("AddressList", null)
          }

          this.nvCtrl.navigateForward("/tabs/home")
        } else {
          this.presentToast("¡Error de credenciales!", data.data.message, "is-error")
        }

      })
      .catch(error => {
        console.log("error login");
        console.log(error);
      });
  }


  setUserCode() {
    const encodeString = localStorage.userSessionData
    const obj = []

    let jsonUserData = JSON.parse(encodeString)
    let objectEntries = Object.entries(jsonUserData.fields)

    for (let [key, value] of objectEntries) {
      obj[key] = String(value)
    }

    localStorage.setItem("codeUserAddress", obj['codcli_b']);
  }

  getUserCode() {
    return localStorage.getItem("codeUserAddress")
  }

  logOutIntoSystem() {
    localStorage.removeItem("userSessionData")
    localStorage.clear()
    this.nvCtrl.navigateForward("/tabs/welcome")
  }

  saveDataIntoLocalStorage(data: string) {
    localStorage.setItem("userSessionData", data);
  }

  validateSession() {
    if (this.sessionGuard.canActivate()) {
      const encodeString = localStorage.userSessionData

      let jsonUserData = JSON.parse(encodeString)
      let objectEntries = Object.entries(jsonUserData.fields)

      for (let [key, value] of objectEntries) {
        this.ProcessDataUserSession[key] = String(value)
      }

      return this.ProcessDataUserSession
    } else {
      return this.sessionGuard.canActivate();
    }
  }

  async presentToast(title: string, description: string, alertType: string) {
    const toast = await this.toastController.create({
      header: title,
      message: description,
      duration: 8000,
      position: 'bottom',
      cssClass: `c-alert ${alertType}`,
    });

    await toast.present();
  }

}
