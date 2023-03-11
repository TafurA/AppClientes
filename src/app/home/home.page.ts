import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

import { LoginService } from '../services/login.service';
import { BannerService } from '../services/banner.service';
import { MarcasService } from '../services/marcas.service';
import { CategoryService } from '../services/category.service';
import { ProductService } from '../services/product.service';

import { BannerComponent } from '../components/banner/banner.component';
import { MarcasComponent } from '../components/marcas/marcas.component';
import { CategoryComponent } from '../components/category/category.component';
import { ProductComponent } from '../components/product/product/product.component';
import { ListProductComponent } from '../components/product/list-product.component';

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

  public arrayDataProducts = new Array();
  public loaded = false;

  constructor(
    private loginService: LoginService,
    private alertController: AlertController,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    public productService: ProductService
  ) {
  }

  ngOnInit() {

  }

  ionViewDidEnter() {
    const shouldCache = this.route.snapshot.data.cache !== false;
    if (!shouldCache) {
      this.cdr.markForCheck();

      if (sessionStorage.getItem("addressOk") !== "true") {
        if (this.loginService.validateSession()) {
          setTimeout(() => {
            if (
              localStorage.getItem("AddressList") != "null") {
              this.listOfAddress()
            }
          }, 1000)
        }
      }

      this.getProducts()
    }
  }

  public slideOpts = {
    slidesPerView: "auto",
    autoHeight: true,
    preventClicksPropagation: true,
    preventClicks: true,
    preventInteractionOnTransition: true,
    spaceBetween: 16,
    setWrapperSize: true
  }

  public async getProducts() {
    this.loaded = false;

    await this.productService.getCurrentProducts().then(() => {
      if (this.productService.isproductsCharged) {
        this.loaded = true
      }
    }).finally(() => {
      this.arrayDataProducts = this.productService.arrayDataProducts
    })
  }

  async fillArrayProducts() {
    this.arrayDataProducts = this.productService.arrayDataProducts
  }

  public listOfAddress() {
    const alert = document.querySelector(".js-alert-address")

    setTimeout(() => {
      document.querySelector(".c-header").classList.add("opacity-2")
      document.querySelector("ion-tab-bar").classList.add("test")
    }, 1000)

    setTimeout(() => {
      alert.classList.add("is-show")
      alert.classList.remove("none")
      const dataList = JSON.parse(localStorage.getItem("AddressList"))
      this.listAddress = dataList
    }, 2000)


    setTimeout(() => {
      this.validateAddressCode()
    }, 3000);

    sessionStorage.setItem("addressOk", "true")
  }

  public validateAddressCode() {
    const radios = document.getElementsByName('address');

    for (let index = 0; index < radios.length; index++) {
      const element = radios[index];
      element.addEventListener("click", e => {
        this.codeConfirmAddress = (e.target as HTMLInputElement).value // Código de la dirección seleccionada
        this.buttonConfirmAddres = true;

        // Obtener el bodcli de la dirección seleccionada
        JSON.parse(localStorage.getItem("AddressList")).forEach(element => {
          if (element.codcli_b == this.codeConfirmAddress) {
            localStorage.setItem("codeBodCli", element.bodcli_b)
          }
        });

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
