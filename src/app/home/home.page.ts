import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';

import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';

import { LoginService } from '../services/login.service';
import { BannerService } from '../services/banner.service';
import { BannerComponent } from '../components/banner/banner.component';
import { MarcasComponent } from '../components/marcas/marcas.component';
import { MarcasService } from '../services/marcas.service';
import { CategoryComponent } from '../components/category/category.component';
import { CategoryService } from '../services/category.service';
import { ProductService } from '../services/product.service';
import { ProductComponent } from '../components/product/product/product.component';
import { ListProductComponent } from '../components/product/list-product.component';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  providers: [
    HTTP,
    LoginService,
    BannerService,
    MarcasService,
    CategoryService,
    ProductService,
    BannerComponent,
    MarcasComponent,
    CategoryComponent,
    ProductComponent,
    ListProductComponent
  ]
})
export class HomePage implements OnInit {

  listAddress = []
  codeConfirmAddress = ""
  buttonConfirmAddres = false;

  constructor(private loginService: LoginService, private alertController: AlertController) {
  }

  ngOnInit() {
    if (
      localStorage.getItem("AddressList") != null) {
      this.listOfAddress()
    } else {
      console.log("ES NULL O DEFAULT NO DEBERIA HACER MAS")
    }

    console.log('Initializing HomePage');

    // Request permission to use push notifications
    // iOS will prompt user and return if they granted permission or not
    // Android will just grant without prompting
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });

    PushNotifications.addListener('registration', (token: Token) => {
      alert('Toca ver como regunto: ' + token.value);
    });

    // PushNotifications.addListener('registrationError', (error: any) => {
    //   alert('Error on registration: ' + JSON.stringify(error));
    // });

    PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        alert('Push received: ' + JSON.stringify(notification));
      },
    );

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        alert('acción de notificación push realizada: ' + JSON.stringify(notification));
      },
    );
  }

  public listOfAddress() {
    const alert = document.querySelector(".js-alert-address")

    setTimeout(() => {
      document.querySelector(".c-header").classList.add("opacity-2")
      document.querySelector("ion-tab-bar").classList.add("test")
    }, 1000)

    setTimeout(() => {
      alert.classList.add("is-show")
      const dataList = JSON.parse(localStorage.getItem("AddressList"))
      this.listAddress = dataList
    }, 2000)


    setTimeout(() => {
      this.validateAddressCode()
    }, 3000);
  }

  public validateAddressCode() {
    const radios = document.getElementsByName('address');

    for (let index = 0; index < radios.length; index++) {
      const element = radios[index];
      element.addEventListener("click", e => {
        this.codeConfirmAddress = (e.target as HTMLInputElement).value
        this.buttonConfirmAddres = true;
      })
    }

  }

  public changeAddressCode() {
    const alert = document.querySelector(".js-alert-address")

    localStorage.setItem("codeUserAddress", this.codeConfirmAddress)

    setTimeout(() => {
      document.querySelector(".c-header").classList.remove("opacity-2")
      document.querySelector("ion-tab-bar").classList.remove("test")
      alert.classList.remove("is-show")
    }, 1000)

    setTimeout(() => {
      alert.classList.add("none")
      this.presentAlert()
    }, 1500)
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Confirmación dirección de entrega',
      subHeader: `Dirección actualizada correctamente`,
      cssClass: "c-alert is-success",
    });

    await alert.present();

    setTimeout(() => {
      alert.dismiss()
    }, 2000)
  }

}
