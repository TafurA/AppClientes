import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import {
  PushNotifications,
} from '@capacitor/push-notifications';

import { LoginService } from '../services/login.service';
import { AppVersion } from '@ionic-native/app-version/ngx';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  private NUMBER_PUBLIC_VERSION = "1.6";
  public alert;
  isOnline = navigator.onLine;
  currentVersion: boolean = true;
  currentNumberVersion: string = '';

  constructor(
    public loginService: LoginService,
    public nav: NavController,
    public alertController: AlertController,
    private appVersion: AppVersion
  ) { }

  ngOnInit() {
    this.validateVersion()
  }

  validateNetwork(event: any) {
    let hrefToRedirect: string = ""

    if (event != null) {
      hrefToRedirect = event.target.dataset.href
    }

    if (this.isOnline) {
      switch (hrefToRedirect) {
        case "login":
          this.nav.navigateForward("/tabs/login")
          break;
        case "register":
          this.nav.navigateForward("/tabs/register")
          break;
        default:
          this.nav.navigateForward("/tabs/home")
          break;
      }
    } else {
      this.alertWithoutNetwork()
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
        this.validateNetwork(null)
      });
    } else {
      this.nav.navigateForward("/tabs/welcome")
    }
  }

  /**
   * Valida si la versión descargada es igual a la versión publicada 
   * para continuar al flujo de sesion. this.validateSession()
   * 
   * @memberof WelcomePage
   */
  validateVersion() {
    this.appVersion.getVersionNumber().then((uploadNumberVersion) => {
      this.currentNumberVersion = uploadNumberVersion
      if (uploadNumberVersion != this.NUMBER_PUBLIC_VERSION) {
        this.alertUnUpdatedVersion(
          '¡Actualizar aplicación!',
          'Si ve este mensaje, verifique que tenga la aplicación actualizada, gracias',
          'is-error'
        )
        this.currentVersion = false
      } else {
        this.validateSession()
      }
    }).catch((error) => {
      console.log('Error al obtener la versión:', error);
    })
  }

  async alertWithoutNetwork() {
    this.alert = await this.alertController.create({
      header: "Problemas de conexion",
      subHeader: "No se ha podido obtener una conexion, por favor intenta de nuevo.",
      cssClass: `c-alert is-error`
    });

    await this.alert.present();

    setTimeout(() => {
      this.alert.dismiss()
    }, 4000)
  }

  async alertUnUpdatedVersion(title: string, description: string, alertType: string) {
    this.alert = await this.alertController.create({
      header: title,
      subHeader: description,
      cssClass: `c-alert ${alertType}`,
      buttons: [
        {
          text: 'Actualizar',
          cssClass: 'o-button o-button_small',
          handler: () => {
            console.log("entroo")
            setTimeout(() => {
              window.location.href = "https://play.google.com/store/apps/details?id=com.surtilider.SurtiTienda&rdid=com.surtilider.SurtiTienda&feature=md&offerId"
            }, 200);
          },
        },
      ],
    });

    await this.alert.present();
  }

}
