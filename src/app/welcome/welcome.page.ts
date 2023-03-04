import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import {
  PushNotifications,
} from '@capacitor/push-notifications';

import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  public alert;
  isOnline = navigator.onLine;

  constructor(public loginService: LoginService, public nav: NavController, public alertController: AlertController) { }

  ngOnInit() {
    this.validateSession()
  }

  validateNetwork() {
    if (this.isOnline) {
      this.nav.navigateForward("/tabs/home")
    } else {
      console.log("no tiene sale alerta")
      this.presentAlert()
    }
  }

  validateSession() {

    if (this.loginService.validateSession()) {
      PushNotifications.requestPermissions().then(result => {
        if (result.receive === 'granted') {
          // Register with Apple / Google to receive push via APNS/FCM
          PushNotifications.register();
        } else {
          // Show some error
          console.log("error en alertas")
        }
      }).finally(() => {
        this.nav.navigateForward("/tabs/home")
      });
    } else {
      this.nav.navigateForward("/tabs/welcome")
    }
  }

  async presentAlert() {
    this.alert = await this.alertController.create({
      header: "Problemas de conexion",
      subHeader: "No se ha podido obtener una conexion, por favor intenta de nuevo.",
      cssClass: `c-alert is-error`
      // buttons: ['OK'],
    });

    await this.alert.present();

    setTimeout(() => {
      this.alert.dismiss()
    }, 5000)
  }

}
