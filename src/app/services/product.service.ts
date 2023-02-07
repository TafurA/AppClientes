import { Injectable } from '@angular/core';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public arrayDataProducts = new Array();
  public arrayDataProductSearch = new Array();
  public arrayDetailProduct = new Array();

  public isproductsCharged = true

  constructor(private http: HTTP, public loginService: LoginService) { }

  async getProductsSearch() {
    // await axios.get(`${environment.apiPath}/consultarProductos`, environment.headerConfig).then(response => {

    //   for (let index = 0; index < response.data.data.length; index++) {
    //     const element = response.data.data[index];
    //     this.arrayDataProductSearch[index] = element
    //   }

    // }).finally(() => {
    //   this.isproductsCharged = true
    // })

    await this.http.get(`${environment.url}${environment.apiPath}consultarProductos`, "", environment.headers)
      .then(data => {
        const dataObjTemp = JSON.parse(data.data)

        for (let index = 0; index < dataObjTemp.data.length; index++) {
          const element = dataObjTemp.data[index];
          this.arrayDataProductSearch[index] = element
        }

      }).finally(() => {
        this.isproductsCharged = true
      })
      .catch(error => {
        console.log("error search utos roductos");
        console.log(error);
      });
  }

  async getProducts() {
    await this.http.get(`${environment.url}${environment.apiPath}consultarProductos`, "", environment.headers)
      .then(data => {

        const dataObjTemp = JSON.parse(data.data)
        for (let index = 0; index < dataObjTemp.data.length; index++) {
          const element = dataObjTemp.data[index];
          this.arrayDataProducts[index] = element
        }

      }).finally(() => {
        this.isproductsCharged = true
      })
      .catch(error => {
        console.log("error productos");
        console.log(error);

      });
  }

  async getProductDetail(productId) {

    await this.http.get(`${environment.url}${environment.apiPath}getProductoDetail?producto=${productId}`, "", environment.headers)
      .then(data => {
        const dataObjTemp = JSON.parse(data.data)
        console.log("DETAIL", data)
        this.arrayDetailProduct = dataObjTemp.dataObjProduct
      })
      .catch(error => {
        console.log("error product detail");
        console.log(error);
      });

  }

  async getRecomendedProducts(nit) {
    this.arrayDataProducts = []

    await this.http.get(`${environment.url}${environment.apiPath}getRecommended?nit=${nit}`, "", environment.headers)
      .then(data => {
        console.log(JSON.parse(data.data))
        JSON.parse(data.data).data.forEach(element => {
          this.arrayDataProducts.push(element)
        });
      }).finally(() => {
        this.isproductsCharged = true
      })
      .catch(error => {
        console.log("error productos recomendados");
        console.log(error);
      });
  }

  async getOffertProducts() {
    this.arrayDataProducts = []

    await this.http.get(`${environment.url}${environment.apiPath}getProductOffers`, "", environment.headers)
      .then(data => {

        const dataObjTemp = JSON.parse(data.data)
        for (let index = 0; index < dataObjTemp.data.length; index++) {
          const element = dataObjTemp.data[index];
          this.arrayDataProducts[index] = element
        }

      }).finally(() => {
        this.isproductsCharged = true
      })
      .catch(error => {
        console.log("error productos offert");
        console.log(error);

      });
  }

  async getCurrentProducts() {
    let session = false;

    if (this.loginService.validateSession()['codcli_b']) {
      session = true
      console.log("ESTA LOGEUADO EL USUARIO")
    }

    if (!session) {

      return await this.getProducts().finally(() => {
        this.isproductsCharged = true
        console.log(this.arrayDetailProduct)
      })

    } else {

      if (window.location.pathname.includes("category")) {
        return await this.getProducts().finally(() => {
          this.isproductsCharged = true
          console.log(this.arrayDetailProduct)
        })
      } else {
        console.log("llega aqui 2")
        console.log(this.loginService.getUserCode())
        return await this.getRecomendedProducts(this.loginService.validateSession()['codcli_b']).finally(
          () => {
            console.log(this.arrayDataProducts)
            this.isproductsCharged = true
          }
        )
      }

    }

  }

  public getArrayDataProducts() {
    return this.arrayDataProducts
  }

}
