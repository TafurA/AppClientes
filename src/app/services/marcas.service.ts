import { Injectable } from '@angular/core';
import axios from 'axios';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MarcasService {
  public arrayDataMarcas = new Array();
  public arrayDataSubProvider;
  public isProductsNull = false;

  constructor(private http: HTTP) { }

  async getListMarcas() {
    await this.http.get(`${environment.url}${environment.apiPath}getProvider`, "", environment.headers)
      .then(data => {

        const dataMarcasTemp = JSON.parse(data.data)
        for (let index = 0; index < dataMarcasTemp.data.length; index++) {
          const element = dataMarcasTemp.data[index];
          this.arrayDataMarcas[index] = element
        }

        console.log("this.arrayDataMarcas")
        console.log(this.arrayDataMarcas)

      })
      .catch(error => {
        console.log("error marcas");
        console.log(error);

      });
  }

  async getProviderDetail(idProvider) {
    await this.http.get(`${environment.url}${environment.apiPath}/getDetailProvider?provider=${idProvider}`, "", environment.headers)
      .then(data => {

        this.arrayDataSubProvider = []
        localStorage.removeItem("providersDetail")

        const dataMarcasTemp = JSON.parse(data.data)
        for (let index = 0; index < dataMarcasTemp.data.length; index++) {
          const element = dataMarcasTemp.data[index];
          this.arrayDataMarcas[index] = element
        }

        if (typeof (dataMarcasTemp.data.length) == "undefined") {

          for (const key in dataMarcasTemp.data) {

            const element = dataMarcasTemp.data[key];
            const dataDetailProvider = {
              nameCategory: key,
              product: element
            }
            this.arrayDataSubProvider.push(dataDetailProvider)
          }

          localStorage.setItem("providersDetail", JSON.stringify(this.arrayDataSubProvider))
          this.setIsProductsNull(false)
        } else {
          this.setIsProductsNull(true)
        }

      })
      .catch(error => {
        console.log("error detalle de provedor");
        console.log(error);
      });
  }

  public getIsProductsNull() {
    return this.isProductsNull
  }

  public setIsProductsNull(isProductsNull) {
    this.isProductsNull = isProductsNull
  }

  public arrayMarcas() {
    return this.arrayDataMarcas
  }
}
