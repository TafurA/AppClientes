import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';

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
    if (localStorage.getItem("AddressList") != "default") {
      this.listOfAddress()
    }
  }

  public listOfAddress() {
    console.log("si entro al listOfAddress")

    const alert = document.querySelector(".js-alert-address")

    setTimeout(() => {
      document.querySelector(".c-header").classList.add("opacity-2")
      document.querySelector("ion-tab-bar").classList.add("test")
    }, 1000)

    setTimeout(() => {
      alert.classList.add("is-show")
      const dataList = JSON.parse(localStorage.getItem("AddressList"))
      this.listAddress = dataList

      console.log("this.listAddress")
      console.log(this.listAddress)
    }, 2000)


    setTimeout(() => {
      this.validateAddressCode()
    }, 3000);
  }

  public validateAddressCode() {
    console.log("entro a validateAddressCode")
    const radios = document.getElementsByName('address');
    const action = document.querySelector(".js-address-btn");

    console.log(radios)

    for (let index = 0; index < radios.length; index++) {
      const element = radios[index];
      element.addEventListener("click", e => {
        this.codeConfirmAddress = (e.target as HTMLInputElement).value
        this.buttonConfirmAddres = true;
        console.log("this.codeConfirmAddress")
        console.log(this.codeConfirmAddress)
      })
    }
    // Iteramos sobre ellos y agregamos un escuchador de eventos a cada uno
    // radios.forEach(radio => {
    //   radio.addEventListener('change', e => {
    //     // Obtenemos el valor del radio seleccionado
    //     const value = e.target;

    //     // Aquí puedes hacer lo que quieras con ese valor
    //     console.log("value");
    //     console.log(value);
    //   });
    // });
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
      console.log("AQUIIIIIIII")
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
