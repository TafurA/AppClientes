import { Injectable } from '@angular/core';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import axios from 'axios';

import { environment } from 'src/environments/environment';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class ShopingCarService {

  public product = {
    "productCode": "",
    "nameProduct": "",
    "imgProduct": "",
    "quantityProduct": 0,
    "priceFinal": 0,
    "price": 0,
    "cantpun_b": 0,
    "puntos": 0,
    "valpun_b": "0",
    "valor": "0",
    "precioSinDcto": "0",
    "porcDescuento": "0",
    "isOffert": false,
    "isCashback": false
  }
  public order = [{
    "idOrder": "",
    "customerCodeOrder": "",
    "discount": "",
    "vendedor": "",
    "shoppingDetail": []
  }]
  public products = []
  public counterProduct;
  public alert;
  public arrayDataCashback = new Array()
  public arrayDataSeller = new Array()
  public idOrderCurrent: any;

  constructor(public loginService: LoginService, private http: HTTP) { }

  public async getProductData(currentProduct) {
    this.product.productCode = currentProduct.codeProduct
    this.product.nameProduct = currentProduct.nameProduct
    this.product.imgProduct = currentProduct.img_prod
    this.product.quantityProduct = 0;
    this.product.price = currentProduct.totalValue
    this.product.valor = currentProduct.valor
    this.product.valpun_b = currentProduct.valpun_b
    this.product.precioSinDcto = currentProduct.precioSinDcto
    this.product.porcDescuento = currentProduct.porcDescuento
    this.product.isOffert = this.product.isOffert
    this.product.isCashback = this.product.isCashback
  }

  public async saveIntoCar(currentProduct) {
    this.getProductData(currentProduct).then(() => {

      const storageCarProduct = localStorage.getItem("productsCar")

      if (storageCarProduct) {

        const newDataCarProducts = JSON.parse(storageCarProduct) // Guardar array de productos

        for (let index = 0; index < newDataCarProducts.length; index++) {
          const element = newDataCarProducts[index];
          if (element.productCode == this.product.productCode) {
            this.product.quantityProduct = element.quantityProduct
            this.alertProduct("informative")
          } else {
            this.alertProduct("success")
          }
        }

        newDataCarProducts.push(this.product) // Guarda producto actual
        this.updateStorageCarProduct(newDataCarProducts, true, this.product.productCode, "general") // Actualiza local storage

      } else {
        // Guardar producto por primera vez
        this.products = []
        this.product.quantityProduct = 1
        this.products.push(this.product)
        localStorage.setItem("productsCar", JSON.stringify(this.products))
        this.alertProduct("success")
      }

    }).finally(() => {
      this.changeCurrentValueCounterProduct()
    })
  }

  public async dropCar() {
    window.localStorage.removeItem("productsCar")
    window.localStorage.removeItem("orderService")
    this.resetAlertAndCarIcon()
  }

  public addProductQuantity(codeProduct) {
    this.updateProductQuantity(codeProduct, "sum", "general")
  }

  public addProductQuantityDetail(product) {
    this.getProductData(product).then(() => {

      const storageCarProduct = localStorage.getItem("productsCar")
      const temporalProduct = {
        "productCode": "",
        "nameProduct": "",
        "imgProduct": "",
        "quantityProduct": 0,
        "priceFinal": 0,
        "price": 0,
        "cantpun_b": 0,
        "puntos": 0,
        "valpun_b": "0",
        "valor": "0",
        "precioSinDcto": "0",
        "porcDescuento": "0",
        "isOffert": false,
        "isCashback": false
      }

      if (storageCarProduct) {

        const newDataCarProducts = JSON.parse(storageCarProduct) // Guardar array de productos
        const alertProduct = document.querySelector(".js-alert-product");
        let booleanTest: boolean = true;

        for (let index = 0; index < newDataCarProducts.length; index++) {
          const element = newDataCarProducts[index];
          if (element.productCode == product.productCode) {
            product.quantityProduct = element.quantityProduct
            booleanTest = false;
          }
        }

        // setTimeout(() => {
        if (booleanTest) {
          alertProduct.querySelector(".c-add-car").classList.add("test")
          this.alertProduct("success")
          setTimeout(() => {
            alertProduct.classList.remove("is-show")
          }, 1500)
          setTimeout(() => {
            alertProduct.querySelector(".c-add-car").classList.remove("test")
          }, 1600)
        }
        // }, 600)


        temporalProduct.productCode = product.productCode
        temporalProduct.nameProduct = product.nameProduct
        temporalProduct.imgProduct = product.imgProduct
        temporalProduct.quantityProduct = product.quantityProduct
        temporalProduct.price = product.price
        temporalProduct.valor = product.valor
        temporalProduct.valpun_b = product.valpun_b
        temporalProduct.precioSinDcto = product.precioSinDcto
        temporalProduct.porcDescuento = product.porcDescuento
        temporalProduct.isOffert = temporalProduct.isOffert
        temporalProduct.isCashback = temporalProduct.isCashback

        newDataCarProducts.push(temporalProduct) // Guarda producto actual
        this.updateStorageCarProduct(newDataCarProducts, true, temporalProduct.productCode, "detail") // Actualiza local storage

      } else {
        // Guardar producto por primera vez
        this.products = []
        product.quantityProduct = 0
        temporalProduct.productCode = product.productCode
        temporalProduct.nameProduct = product.nameProduct
        temporalProduct.imgProduct = product.imgProduct
        temporalProduct.quantityProduct = product.quantityProduct
        temporalProduct.price = product.price
        temporalProduct.valor = product.valor
        temporalProduct.valpun_b = product.valpun_b
        temporalProduct.precioSinDcto = product.precioSinDcto
        temporalProduct.porcDescuento = product.porcDescuento
        temporalProduct.isOffert = temporalProduct.isOffert
        temporalProduct.isCashback = temporalProduct.isCashback

        this.products.push(temporalProduct)

        localStorage.setItem("productsCar", JSON.stringify(this.products))
        this.alertProduct("success")
        this.updateProductQuantity(temporalProduct.productCode, "sum", "detail")
      }

    }).finally(() => {
      this.changeCurrentValueCounterProduct()
    })
  }

  public removeProductQuantity(codeProduct) {
    this.updateProductQuantity(codeProduct, "rest", "general")

    const storageCarProducts = JSON.parse(localStorage.productsCar)

    const filteredLibraries = storageCarProducts.filter((item) => item.quantityProduct !== 0)
    this.updateStorageCarProduct(filteredLibraries, false, 0, "general")

    this.resetAlertAndCarIcon()
    this.changeCurrentValueCounterProduct()
  }

  public updateProductQuantity(codeProduct, action, themeage) {
    const storageCarProducts = JSON.parse(localStorage.productsCar)
    const newDataCarProducts = JSON.parse(localStorage.productsCar)

    for (let index = 0; index < storageCarProducts.length; index++) {
      const element = storageCarProducts[index];

      if (codeProduct != 0) {
        if (element.productCode == codeProduct) {

          if (action == "sum") {
            element.quantityProduct = element.quantityProduct + 1
          } else {
            element.quantityProduct = element.quantityProduct - 1
          }

          console.log("element.quantityProduct", element.quantityProduct)

          newDataCarProducts.push(element)

          if (themeage == "detail") {
            this.changeCurrentValueQuantityProductDetail(element.quantityProduct)
          } else {
            this.changeCurrentValueQuantityProduct(element.quantityProduct)
          }
        }
      }
    }

    this.updateStorageCarProduct(newDataCarProducts, false, 0, "general")
  }

  public resetAlertAndCarIcon() {
    const numberCardAddProduct = document.querySelector(".js-number-card-product-card");

    if (numberCardAddProduct.innerHTML == "0") {
      if (document.querySelector(".js-alert-product").classList.contains("is-show")) {
        numberCardAddProduct.closest(".js-alert-product").querySelector(".c-product-alert__title").innerHTML = "Producto eliminado"
        numberCardAddProduct.closest(".js-alert-product").classList.add("is-informative")
        setTimeout(() => {
          numberCardAddProduct.closest(".js-alert-product").classList.remove("is-success")
          numberCardAddProduct.closest(".js-alert-product").classList.remove("is-informative")
          numberCardAddProduct.closest(".js-alert-product").classList.remove("is-show")
        }, 1000)
      }
    }

    if (!localStorage.productsCar) {
      const idIcoCar = document.querySelector(".js-ico-car");
      const idSearchHeader = document.querySelector(".js-search-header");
      idSearchHeader.classList.add("is-none-car")
      idIcoCar.classList.add("test")
      idIcoCar.querySelector(".js-text-ico-car").innerHTML = "0"
    }

  }

  public changeCurrentValueCounterProduct() {
    if (localStorage.productsCar) {
      const domNumberCount = JSON.parse(localStorage.productsCar).length
      const idIcoCar = document.querySelectorAll(".js-ico-car");
      const idSearchHeader = document.querySelectorAll(".js-search-header");

      idIcoCar.forEach(element => {
        element.classList.remove("test")
        const textIco = element.querySelectorAll(".js-text-ico-car")
        textIco.forEach(element => {
          element.innerHTML = domNumberCount
        });

        element.classList.add("is-product-add")
        setTimeout(() => {
          element.classList.remove("is-product-add")
        }, 500)

      });

      idSearchHeader.forEach(element => {
        element.classList.remove("is-none-car")
      });


    }
  }

  private changeCurrentValueQuantityProductDetail(quantity) {
    const numberQuantityProdudct = document.querySelector(".js-detail-number");

    numberQuantityProdudct.innerHTML = quantity

    numberQuantityProdudct.classList.add("is-animated")
    setTimeout(() => {
      numberQuantityProdudct.classList.remove("is-animated")
    }, 500)
  }

  private changeCurrentValueQuantityProduct(quantity) {
    const numberQuantityProdudct = document.querySelectorAll(".js-number-card-product-card");

    numberQuantityProdudct.forEach(element => {

      element.innerHTML = quantity

      element.classList.add("is-animated")
      setTimeout(() => {
        element.classList.remove("is-animated")
      }, 500)
    });
  }

  private updateStorageCarProduct(newDataCarProducts, save, codeProduct, themeage) {
    // Remover ID de productos duplicados
    var uniqueArray = this.removeDuplicates(newDataCarProducts, "productCode");
    localStorage.setItem("productsCar", JSON.stringify(uniqueArray))

    if (uniqueArray.length == 0) {
      localStorage.removeItem("productsCar")

      if (!window.location.pathname.includes("detail-product")) {
        setTimeout(() => {
          document.querySelector(".js-number-card-product").innerHTML = "1"
        }, 1000)
      }
    }

    if (save) {
      if (themeage == "detail") {
        this.updateProductQuantity(codeProduct, "sum", "detail")
      } else {
        this.updateProductQuantity(codeProduct, "sum", "general")
      }
    }

  }

  private removeDuplicates(originalArray, prop) {
    var newArray = [];
    var lookupObject = {};

    for (var i in originalArray) {
      lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for (i in lookupObject) {
      newArray.push(lookupObject[i]);
    }
    return newArray;
  }

  public async getClientCashback(userCredential) {

    await this.http.get(`${environment.url}${environment.apiPath}/accumulatedMoney?codigo=${userCredential}`, "", environment.headers)
      .then(data => {
        const dataObjTemp = JSON.parse(data.data)
        for (let index = 0; index < dataObjTemp.data.length; index++) {
          const element = dataObjTemp.data[index];
          this.arrayDataCashback[index] = element
        }
      })
      .catch(error => {
        console.log("error cashback");
        console.log(error);
      });
  }

  public async getClientSeller(userSeller) {

    await this.http.get(`${environment.url}${environment.apiPath}GetSeller?code=${userSeller}`, "", environment.headers)
      .then(data => {
        const dataObjTemp = JSON.parse(data.data)
        for (let index = 0; index < dataObjTemp.data.length; index++) {
          const element = dataObjTemp.data[index];
          this.arrayDataSeller[index] = element
        }
      })
      .catch(error => {
        console.log("error seller");
        console.log(error);
      });
  }

  public setArrayOfOrder(reference, seller) {

    this.order[0].shoppingDetail = []
    this.order[0].customerCodeOrder = this.loginService.validateSession()['codcli_b']
    this.order[0].discount = reference
    this.order[0].vendedor = seller

    const localSotrage = JSON.parse(window.localStorage.getItem("productsCar"))
    localSotrage.forEach(product => {
      const tempData = {
        "productCode": "",
        "quantityProduct": 0,
      }
      tempData.productCode = product.productCode
      tempData.quantityProduct = product.quantityProduct

      this.order[0].shoppingDetail.push(tempData)
    });

    localStorage.setItem("orderService", window.btoa(unescape(encodeURIComponent(JSON.stringify(this.order)))));
  }

  public getArrayOfOrder() {
    let shoppingCart = window.localStorage.getItem("orderService")
    return shoppingCart
  }

  public async sendOrder() {

    await this.http.get(`${environment.url}${environment.apiPath}sendOrder?idOrder=${this.getArrayOfOrder()}`, "", environment.headers)
      .then(data => {

        if (data.data.response) {
          this.idOrderCurrent = data.data.idpedido
        } else {
          console.log("ERROR CREANDO LA ORDEN")
          console.log(data)
        }

      })
      .catch(error => {
        console.log("error");
        console.log(error);
      });
  }

  private alertProduct(action) {
    const alertProduct = document.querySelector(".js-alert-product");
    alertProduct.setAttribute("id", this.product.productCode)
    alertProduct.classList.remove("is-show")

    if (window.location.pathname.includes("detail-product")) {
      // alertProduct.querySelector(".c-add-car").classList.add("test")
      // setTimeout(() => {
      //   alertProduct.classList.remove("is-show")
      // }, 1500)
    } else {
      alertProduct.querySelector(".c-add-car").classList.remove("test")
    }

    if (action == "null") {
      alertProduct.classList.remove("is-show")

    } else if (action == "informative") {
      setTimeout(() => {
        alertProduct.classList.remove("is-success")
        alertProduct.classList.add("is-informative")
        alertProduct.querySelector(".c-product-alert__title").innerHTML = "Cantidad actualizada"
      }, 100)

      alertProduct.classList.add("is-show")

    } else if (action == "success") {

      alertProduct.classList.add("is-success")
      alertProduct.querySelector(".c-product-alert__title").innerHTML = "Producto agregado"
      alertProduct.classList.remove("is-informative")

      alertProduct.classList.add("is-show")
    }

  }

  public closeAlert() {
    const alertProduct = document.querySelector(".js-alert-product");
    alertProduct.classList.remove("is-show")
  }
}
