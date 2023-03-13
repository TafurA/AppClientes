import { Injectable } from '@angular/core';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
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
        this.arrayDetailProduct = dataObjTemp.dataObjProduct
      })
      .catch(error => {
        console.log("error product detail");
        console.log(error);
      });

  }

  async getRecomendedProducts(nit) {
    this.arrayDataProducts = []
    const codeBodCli = JSON.parse(localStorage.getItem("codeBodCli"))
    await this.http.get(`${environment.url}${environment.apiPath}getRecommended?nit=${nit}&bodega=${codeBodCli}`, "", environment.headers)
      .then(data => {
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

  async getRelatedProducts(bannerId) {
    this.arrayDataProducts = []
    const codeBodCli = JSON.parse(localStorage.getItem("codeBodCli"))
    await this.http.get(`${environment.url}${environment.apiPath}getProductoRelated?searchword=${bannerId}&bodega=${codeBodCli}`, "", environment.headers)
      .then(data => {
        JSON.parse(data.data).dataObjRelated.forEach(element => {
          this.arrayDataProducts.push(element)
        });
      }).finally(() => {
        this.isproductsCharged = true
      })
      .catch(error => {
        console.log("error productos relacionados");
        console.log(error);
      });
  }

  async getOffertProducts() {
    this.arrayDataProducts = []
    const codeBodCli = JSON.parse(localStorage.getItem("codeBodCli"))

    await this.http.get(`${environment.url}${environment.apiPath}getProductOffers?bodega=${codeBodCli}`, "", environment.headers)
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
    }

    if (!session) {

      return await this.getProducts().finally(() => {
        this.isproductsCharged = true
      })

    } else {

      if (window.location.pathname.includes("category")) {
        return await this.getProducts().finally(() => {
          this.isproductsCharged = true
        })
      } else {
        return await this.getRecomendedProducts(this.loginService.validateSession()['codcli_b']).finally(
          () => {
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
