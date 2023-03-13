import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';

@Injectable({
  providedIn: 'any',
})

export class BannerService {
  public arrayDataProducts = new Array();
  public arrayDetailBanner = new Array();
  public arrayDataBanner = new Array();
  public isBannersCharged = false

  constructor(private http: HTTP) { }

  async getBannerList() {
    await this.http.get(`${environment.url}${environment.apiPath}getBanner`, "", environment.headers)
      .then(data => {

        const dataBennerTemp = JSON.parse(data.data)
        for (let index = 0; index < dataBennerTemp.data.length; index++) {
          const element = dataBennerTemp.data[index];
          this.arrayDataBanner[index] = element
        }

      }).finally(() => { this.isBannersCharged = true })
      .catch(error => {
        console.log("error");
        console.log(error);
      });
  }

  async getBannerDetail(bannerId) {

    const codeBodCli = JSON.parse(localStorage.getItem("codeBodCli"))

    await this.http.get(`${environment.url}${environment.apiPath}getDetailBanner?codigo=${bannerId}&bodega=${codeBodCli}`, "", environment.headers)
      .then(data => {

        const dataBennerTemp = JSON.parse(data.data)

        console.log("BANNER SERVICE")
        console.log(dataBennerTemp)

        this.arrayDataProducts = []

        this.arrayDetailBanner = dataBennerTemp.dataBanner

        for (let index = 0; index < dataBennerTemp.dataProduct.length; index++) {
          const element = dataBennerTemp.dataProduct[index];
          this.arrayDataProducts[index] = element
        }

      })
      .catch(error => {
        console.log("error getDetailBanner");
        console.log(error);
      });
  }

  public arrayBanner() {
    return this.arrayDataBanner
  }

  public arrayDataProductsBanner() {
    return this.arrayDataProducts
  }

  public arrayDetailProductBanner() {
    return this.arrayDetailBanner
  }
}
