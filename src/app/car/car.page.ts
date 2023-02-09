import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { HeaderBackComponent } from '../components/layout/header-back/header-back.component';

import { LoginService } from '../services/login.service';
import { ShopingCarService } from '../services/shoping-car.service';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-car',
  templateUrl: './car.page.html',
  providers: [HeaderBackComponent]
})
export class CarPage implements OnInit {
  private refreshSubject = new Subject<void>();
  refresh$ = this.refreshSubject.asObservable();

  public arrayProducts = new Array()
  public arrayCashback = new Array()
  isRemoved = false;
  isCashbackApply = false
  isSellerApply = false
  public totalProductPrice: any = 0
  public subtotalProductPrice: any = 0
  public totalProductPriceProcess: any = 0
  public isTotalCompra = false
  public totalCashback: any = 0
  public cashbackReference = 0
  public sellerReference = ""
  public sellerReferenceId = 0
  public arraySeller = new Array()
  public disabled = true;
  public loaded = false;

  public isCashbackProduct = false


  constructor(
    public alertController: AlertController,
    public shopingService: ShopingCarService,
    public loginService: LoginService,
    public nvCtrl: NavController,
  ) { }

  ngOnInit() {
    this.refresh$.subscribe(() => {
      this.setProductsIntoArray().finally(() => {
        // setTimeout(() => {
        this.loaded = true;
        // }, 1000)
      })
      this.getPriceTotalProducts()
      this.getPriceProcess()
    })

    this.shopingService.getClientCashback(this.loginService.getUserCode()).then(() => {
      this.arrayCashback = this.shopingService.arrayDataCashback
    })
    this.shopingService.getClientSeller(this.loginService.getUserCode()).then(() => {
      this.arraySeller = this.shopingService.arrayDataSeller
    })

    setInterval(() => {
      this.refresh()
    }, 1000)
  }

  refresh() {
    this.refreshSubject.next();
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
        this.getPriceTotalProducts()

        if (this.currentProductsCarNumber() == 0) {
          localStorage.removeItem("productsCar")
          this.totalProductPriceProcess = 0
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
    this.getCarLocalStorage().forEach(product => {
      const productQuantity = parseFloat(product.price) * product.quantityProduct
      this.totalProductPrice = this.totalProductPrice + productQuantity
      this.getPriceProcess()
    });
  }

  public selectCashback(cashbackObject) {
    let totalWithCashback = 0
    this.subtotalProductPrice = this.getPriceProcess()
    totalWithCashback = this.getPriceProcess() - parseFloat(cashbackObject.dinero)
    this.totalCashback = parseFloat(cashbackObject.dinero).toFixed(3)
    this.totalProductPriceProcess = totalWithCashback.toFixed(3)
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
    this.disabled = false
  }

  public getPriceProcess(): any {
    this.totalProductPriceProcess = parseFloat(this.totalProductPrice).toFixed(3)
    if (this.totalProductPriceProcess > 30.000) {
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
