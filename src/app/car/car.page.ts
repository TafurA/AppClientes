import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { HeaderBackComponent } from '../components/layout/header-back/header-back.component';

import { LoginService } from '../services/login.service';
import { ShopingCarService } from '../services/shoping-car.service';
@Component({
  selector: 'app-car',
  templateUrl: './car.page.html',
  providers: [HeaderBackComponent]
})
export class CarPage implements OnInit {

  public arrayProducts = new Array()
  public arrayCashback = new Array()
  isRemoved = false;
  isCashbackApply = false
  isSellerApply = false
  public totalProductPrice: number = 0
  public subtotalProductPrice: number = 0
  public totalProductPriceProcess: any = 0
  public isTotalCompra = false
  public totalCashback: any = 0
  public cashbackReference = 0
  public sellerReference = ""
  public sellerReferenceId = 0
  public arraySeller = new Array()
  public disabled = true;
  public loaded = false;
  public minimoComra: any

  public isCashbackProduct = false


  constructor(
    public alertController: AlertController,
    public shopingService: ShopingCarService,
    public loginService: LoginService,
    public nvCtrl: NavController,
  ) { }

  ngOnInit(): void {

  }

  ionViewDidEnter() {
    this.setProductsIntoArray().finally(() => {
      this.loaded = true;
    })

    this.shopingService.getClientCashback(this.loginService.getUserCode()).then(() => {
      this.arrayCashback = this.shopingService.arrayDataCashback
    })

    this.shopingService.getClientSeller(this.loginService.getUserCode()).then(() => {
      this.arraySeller = this.shopingService.arrayDataSeller
    })

    this.shopingService.getMinimoCompra(this.loginService.validateSession()['bodcli_b']).then(() => {
      this.minimoComra = parseFloat(localStorage.getItem("MinimoCompra"))
    }).finally(() => {
      this.getPriceTotalProducts()
      this.getPriceProcess()
    })
  }

  public getCarLocalStorage() {
    return JSON.parse(window.localStorage.getItem("productsCar"))
  }

  public async setProductsIntoArray() {
    this.arrayProducts = []

    await this.getCarLocalStorage().forEach(product => {
      this.arrayProducts.push(product)
      this.productWithCashback(product)
      this.productWithDiscount(product)
    });
  }

  public productWithCashback(productObject) {
    if (productObject.valor > "0") {
      productObject.isCashback = true
    }
  }

  public productWithDiscount(productObject) {
    const descuentoFormated = parseInt(productObject.porcDescuento)

    if (descuentoFormated.toFixed(0) > "0") {
      productObject.isOffert = true
    }
  }

  public removeProductIntoCar(productId) {
    const updatedCarProduct = this.getCarLocalStorage().filter((product) => product.productCode !== productId)

    this.presentAlert().finally(() => {

      if (this.isRemoved) {

        localStorage.setItem("productsCar", JSON.stringify(updatedCarProduct))
        this.arrayProducts = updatedCarProduct

        this.totalProductPrice = 0

        this.getPriceTotalProductsRemove()

        if (this.currentProductsCarNumber() == 0) {
          localStorage.removeItem("productsCar")
          this.totalProductPriceProcess = 0
          this.subtotalProductPrice = 0
        }

      }

    })

  }

  public currentProductsCarNumber() {
    if (!this.getCarLocalStorage()) {
      return 0
    } else {
      return this.getCarLocalStorage().length
    }
  }

  public getPriceTotalProducts() {

    this.totalProductPrice = 0

    if (this.getCarLocalStorage()) {
      this.getTotalAndSubtotal()
    } else {
      this.nvCtrl.navigateForward("/tabs/home")
    }

  }

  storageCategoryProduct(object) {
    const descuentoFormated = parseInt(object.porcDescuento)

    if (object.valor > "0") {
      localStorage.setItem("categoryProduct", "cashback")
    } else if (descuentoFormated.toFixed(0) > "0") {
      localStorage.setItem("categoryProduct", "descuento")
    } else {
      localStorage.removeItem("categoryProduct")
    }
  }

  public getPriceTotalProductsRemove() {
    setTimeout(() => {
      if (this.getCarLocalStorage()) {
        this.getTotalAndSubtotal()
      } else {
        this.nvCtrl.navigateForward("/tabs/home").then(() => {
          document.querySelector(".js-ico-car").classList.add("test")
          document.querySelector(".js-search-header").classList.add("is-none-car")

          document.querySelector(".js-number-card-product-card").innerHTML = "1"
        })
      }
    }, 400)
  }

  public getTotalAndSubtotal() {
    this.subtotalProductPrice = 0

    this.getCarLocalStorage().forEach(product => {
      const productQuantity = parseFloat(product.price) * product.quantityProduct

      this.subtotalProductPrice = this.subtotalProductPrice + productQuantity

      if (this.isCashbackApply) {
        this.totalProductPrice = this.subtotalProductPrice - this.totalCashback
      } else {
        this.totalProductPrice = this.subtotalProductPrice
      }

    });

    this.subtotalProductPrice = this.subtotalProductPrice
    this.getPriceProcess()

    this.saveOrderDetailIntoLocalStorage()
  }

  public selectCashback(cashbackObject) {
    let totalWithCashback = 0
    this.subtotalProductPrice = this.getPriceProcess()
    totalWithCashback = this.getPriceProcess() - cashbackObject.dinero
    this.totalCashback = cashbackObject.dinero
    this.totalProductPriceProcess = totalWithCashback
    this.isCashbackApply = true
    document.querySelector(".js-car-dropdown").classList.remove("is-dropdown-show")

    this.cashbackReference = cashbackObject.referencia

    return this.totalProductPriceProcess
  }

  public selectSeller(sellerObject) {
    this.isSellerApply = true
    document.querySelector(".js-car-dropdown-seller").classList.remove("is-dropdown-show")

    this.sellerReference = sellerObject.vendedor
    this.sellerReferenceId = sellerObject.codigoVen
  }

  public getPriceProcess(): any {
    this.totalProductPriceProcess = this.totalProductPrice

    console.log("ESTEEE")

    let num = this.totalProductPriceProcess;
    let numFormatted = num.toString(); // "495.05"
    let decimalIndex = numFormatted.indexOf("."); // 3
    if (decimalIndex === -1) {
      numFormatted += ".000"; // si no hay decimales, se agregan tres ceros al final
    } else {
      let decimals = numFormatted.substring(decimalIndex + 1); // "05"
      if (decimals.length < 3) {
        numFormatted += "0".repeat(3 - decimals.length); // si hay menos de tres decimales, se agregan los ceros faltantes
      }
    }

    console.log("DOS INTNER")
    console.log(this.totalProductPriceProcess)
    console.log(this.totalProductPriceProcess.toString().length)

    // if (this.totalProductPriceProcess.toString().length == 5) {
    //   const este = parseFloat(numFormatted).toLocaleString('en-US') + "00"
    //   console.log("ANTES")
    //   console.log(este)
    //   this.totalProductPriceProcess = este
    //   console.log("desues 00")
    //   console.log(this.totalProductPriceProcess)
    // }
    // else if (this.totalProductPriceProcess.toString().length == 7 || this.totalProductPriceProcess.toString().length == 6) {
    //   const este = parseFloat(numFormatted).toLocaleString('en-US') + "0"
    //   console.log("ANTES")
    //   console.log(este)
    //   this.totalProductPriceProcess = este
    //   console.log("desues")
    //   console.log(this.totalProductPriceProcess)
    // } else {
    //   console.log(parseFloat(numFormatted).toLocaleString('en-US'))
    // }
    
    const options = {
      style: 'decimal',
      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
      useGrouping: true
    };

    console.log("parseFloat(numFormatted).toLocaleString('en-US')")
    console.log(parseFloat(numFormatted).toLocaleString('en-US', options))
    this.totalProductPriceProcess = parseFloat(numFormatted).toLocaleString('en-US', options)

    if (
      this.totalProductPriceProcess
      > this.minimoComra
    ) {
      this.isTotalCompra = true
    } else {
      this.isTotalCompra = false
    }
    return this.totalProductPriceProcess
  }

  public saveOrderIntoLocalStorage() {
    this.shopingService.setArrayOfOrder(this.cashbackReference, this.sellerReferenceId)
    this.saveOrderDetailIntoLocalStorage()
    this.nvCtrl.navigateForward("/tabs/car-detail")
  }

  public saveOrderDetailIntoLocalStorage() {
    const dataTemp = {
      "cashback": this.totalCashback,
      "subtotal": this.subtotalProductPrice,
      "total": this.totalProductPriceProcess,
      'productsLength': this.currentProductsCarNumber()
    }
    localStorage.setItem("orderDetail", JSON.stringify(dataTemp))
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: '¿Quieres eliminar este producto del carrito?',
      cssClass: 'c-alert c-alert_product is-success',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.isRemoved = false;
          },
        },
        {
          text: 'Aceptar',
          role: 'confirm',
          handler: () => {
            this.isRemoved = true;
          },
        },
      ],
    });

    await alert.present();
    await alert.onDidDismiss();
  }

  toggleDropdown(e) {
    e.target.closest(
      ".js-car-dropdown"
    ).classList.toggle("is-dropdown-show")
  }

}
