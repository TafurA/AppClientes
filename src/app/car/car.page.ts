import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

import { LoginService } from '../services/login.service';
import { ShopingCarService } from '../services/shoping-car.service';

import { HeaderBackComponent } from '../components/layout/header-back/header-back.component';


@Component({
  selector: 'app-car',
  templateUrl: './car.page.html',
  providers: [HeaderBackComponent]
})


export class CarPage implements OnInit {

  public arrayProducts = new Array()
  public arrayCashback = new Array()
  public isRemoved = false;
  public isCashbackApply = false
  public isSellerApply = false
  public subtotalProductPrice: any = 0
  public totalProductPriceProcess: any = 0
  public totalCashback: any = 0
  public cashbackReference = 0
  public sellerReference = ""
  public sellerReferenceId = 0
  public arraySeller = new Array()
  public loaded = false;

  // muestra u oculta alerta de cashback
  public minimoCompra: any = 0
  public isTotalCompra = false

  constructor(
    public alertController: AlertController,
    public shopingService: ShopingCarService,
    public loginService: LoginService,
    public nvCtrl: NavController,
  ) { }

  ngOnInit(): void { }

  ionViewDidEnter() {
    this.setProductsIntoArray().finally(() => {
      this.loaded = true;
    })

    // Llena el arreglo de cashbacks
    this.shopingService.getClientCashback(this.loginService.getUserCode()).then(() => {
      this.arrayCashback = this.shopingService.arrayDataCashback
    })

    // Llena el arreglo de vendedores
    this.shopingService.getClientSeller(this.loginService.getUserCode()).then(() => {
      this.arraySeller = this.shopingService.arrayDataSeller
    })

    // Obtiene el minimo de compra por vendedor
    this.getMinPurchase()

  }

  // Retorna el listado de productos
  public getCarLocalStorage() {
    return JSON.parse(window.localStorage.getItem("productsCar"))
  }

  // Obtiene el minimo de compra por vendedor
  public getMinPurchase() {
    this.shopingService.getMinimoCompra(this.loginService.validateSession()['bodcli_b']).then(
      () => {
        this.minimoCompra = this.convertNumberToDecimal(localStorage.getItem("MinimoCompra"))
      }).finally(() => {
        // Renderiza el Total y Subtotal de la orden
        this.getPriceTotalProducts()
      })
  }

  // Agregar productos a un array de productos
  public async setProductsIntoArray() {
    this.arrayProducts = []

    await this.getCarLocalStorage().forEach(product => {
      this.arrayProducts.push(product)
      this.productWithCashback(product)
      this.productWithDiscount(product)
    });
  }

  // Valida si el producto tiene cashback
  public productWithCashback(productObject) {
    if (productObject.valor > "0") {
      productObject.isCashback = true
    }
  }

  // Valida si el producto tiene descuento
  public productWithDiscount(productObject) {
    const descuentoFormated = parseInt(productObject.porcDescuento)

    if (descuentoFormated.toFixed(0) > "0") {
      productObject.isOffert = true
    }
  }

  // Obtiene el número actual de productos en el carrito
  public currentProductsCarNumber() {
    if (!this.getCarLocalStorage()) {
      return 0
    } else {
      return this.getCarLocalStorage().length
    }
  }

  // Valida si el producto es cashback o descuento
  public storageCategoryProduct(object) {
    const descuentoFormated = parseInt(object.porcDescuento)

    if (object.valor > "0") {
      localStorage.setItem("categoryProduct", "cashback")
    } else if (descuentoFormated.toFixed(0) > "0") {
      localStorage.setItem("categoryProduct", "descuento")
    } else {
      localStorage.removeItem("categoryProduct")
    }
  }

  // Convierte cualquier numero a decimal
  public convertNumberToDecimal(number: any): any {
    const options = {
      style: 'decimal',
      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
      useGrouping: true
    };
    const numberFormated = parseFloat(number).toLocaleString('en-US', options)


    return numberFormated
  }

  public removeProductIntoCar(productId) {
    const updatedCarProduct = this.getCarLocalStorage().filter((product) => product.productCode !== productId)

    this.presentAlert().finally(() => {

      if (this.isRemoved) {

        localStorage.setItem("productsCar", JSON.stringify(updatedCarProduct))
        this.arrayProducts = updatedCarProduct

        this.getPriceTotalProductsRemove()

        if (this.currentProductsCarNumber() == 0) {
          localStorage.removeItem("productsCar")
          this.totalProductPriceProcess = 0
          this.subtotalProductPrice = 0
        }

      }

    })

  }

  // Devuelve el Total y Subtotal de la orden con o sin cashback
  public getPriceTotalProducts() {

    // Inicializar siempre los totales en 0
    this.subtotalProductPrice = 0

    // Valida si existen productos en el carro
    if (this.getCarLocalStorage()) {
      this.getTotalAndSubtotal()
    } else {
      this.nvCtrl.navigateForward("/tabs/home")
    }

  }

  // Obtener el valor total del carrito sin subtotal ni descuento
  public getTotalValueOfCar() {
    let totalCarValue = 0;

    this.getCarLocalStorage().forEach(product => {

      // Multiplica la cantidad de cada producto por su valor
      let valueOfProductQuantity = this.convertNumberToDecimal(Number(product.price)) * product.quantityProduct

      // Acumulamos la suma de cada valor en la variable totalCarValue
      totalCarValue += valueOfProductQuantity;
    })

    const totalCarValueFormated = this.convertNumberToDecimal(totalCarValue)

    return totalCarValueFormated
  }

  // Iguala el total y el subtotal de la orden
  public getTotalAndSubtotal() {

    // Total de la orden con cashback y normal
    if (this.isCashbackApply) {
      const totalOrderWithCashback = this.convertToFloat(this.getTotalValueOfCar()) - this.convertToFloat(this.totalCashback)
      this.totalProductPriceProcess = this.convertNumberToDecimal(totalOrderWithCashback)
    } else {
      this.totalProductPriceProcess = this.getTotalValueOfCar()
    }

    // Subtotal de la orden
    this.subtotalProductPrice = this.getTotalValueOfCar()

    this.validateMinValueOfOrder()

    this.saveOrderDetailIntoLocalStorage()
  }

  // Convierte los números a floats Para hacer oPeraciones
  public convertToFloat(str) {
    const num = parseFloat(str.replace(',', ''));
    return num
  }

  public validateMinValueOfOrder() {
    if (this.convertToFloat(this.totalProductPriceProcess) > this.convertToFloat(this.minimoCompra)) {
      this.isTotalCompra = true
    } else {
      this.isTotalCompra = false
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

  // Seleccionar cashback
  public selectCashback(cashbackObject) {
    document.querySelector(".js-car-dropdown").classList.remove("is-dropdown-show")

    this.totalCashback = cashbackObject.dinero
    this.isCashbackApply = true
    this.cashbackReference = cashbackObject.referencia

    this.getTotalAndSubtotal()
  }

  // Seleccionar vendedor
  public selectSeller(sellerObject) {
    this.isSellerApply = true
    document.querySelector(".js-car-dropdown-seller").classList.remove("is-dropdown-show")

    this.sellerReference = sellerObject.vendedor
    this.sellerReferenceId = sellerObject.codigoVen
  }

  // prepara la orden
  public saveOrderIntoLocalStorage() {
    this.shopingService.setArrayOfOrder(this.cashbackReference, this.sellerReferenceId)
    this.saveOrderDetailIntoLocalStorage()
    this.nvCtrl.navigateForward("/tabs/car-detail")
  }

  // Guarda el detalle de la orden  en el storage
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
