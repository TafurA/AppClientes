import { Injectable } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';
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

  constructor(public nvCtrl: NavController, private toastController: ToastController, public sessionGuard: SessionGuard, private http: HTTP, private alertController: AlertController) {
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

          // Address
          if (dataLoginTemp.data.length > 1) {
            const listAddress = []

            dataLoginTemp.data.forEach(element => {
              const dataTempAddress = {
                codcli_b: element.codcli_b,
                dircli_b: element.dircli_b,
                telcli_b: element.telcli_b,
                bodcli_b: element.bodcli_b
              }

              listAddress.push(dataTempAddress)
            });

            localStorage.setItem("AddressList", JSON.stringify(listAddress))
          } else {
            localStorage.setItem("AddressList", null)

            // Guardar el bodcli del usuario cuando no hay direccione
            console.log("data a giardar")
            console.log(dataLoginTemp.data[0])
            this.setBodCli(dataLoginTemp.data[0][9])
          }

          this.nvCtrl.navigateForward("/tabs/home")
        } else {
          this.presentAlert("¡Error de credenciales!", data.data.message, "is-error")
        }

      })
      .catch(error => {
        console.log("error login");
        console.log(error);
      });
  }

  setUserCode() {
    const encodeString = localStorage.userSessionData
    let jsonUserData = JSON.parse(encodeString)

    localStorage.setItem("codeUserAddress", jsonUserData[0]);
  }

  setBodCli(bodCli) {
    const encodeString = localStorage.userSessionData

    console.log("jsonUserData")
    console.log(bodCli)

    localStorage.setItem("codeBodCli", bodCli);
  }

  getUserCode() {
    return localStorage.getItem("codeUserAddress")
  }

  logOutIntoSystem() {
    localStorage.removeItem("userSessionData")
    localStorage.clear()
    this.nvCtrl.navigateForward("/tabs/welcome")
    console.log("asdad")
    this.resetNumberCar()
  }

  resetNumberCar() {
    const numberCar = document.querySelector(".js-text-ico-car")
    const search = document.querySelector(".js-search-header");
    const icoCar = document.querySelector(".js-ico-car");

    console.log("numberCar.innerHTML")
    console.log(numberCar.innerHTML)

    if (numberCar.innerHTML.toString() == "1") {
      numberCar.innerHTML == "0"
      search.classList.add("is-none-car")
      icoCar.classList.add("test")
    }
  }

  saveDataIntoLocalStorage(data: string) {
    localStorage.setItem("userSessionData", data);
  }

  validateSession() {
    if (this.sessionGuard.canActivate()) {
      const encodeString = JSON.parse(localStorage.userSessionData)

      return encodeString
    } else {
      return this.sessionGuard.canActivate();
    }
  }

  async presentAlert(title: string, description: string, alertType: string) {
    const alert = await this.alertController.create({
      header: title,
      subHeader: description,
      cssClass: `c-alert ${alertType}`,
    });

    await alert.present();

    setTimeout(() => {
      alert.dismiss()
    }, 2000)
  }

}
