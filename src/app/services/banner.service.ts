import { Injectable } from '@angular/core';
import axios from 'axios';

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
    // await axios.get(`${environment.apiPath}${environment.apiPath}getBanner`, environment.headerConfig).then(response => {

    //   if (response.data.response) {
    //     for (let index = 0; index < response.data.data.length; index++) {
    //       const element = response.data.data[index];
    //       this.arrayDataBanner[index] = element
    //     }
    //   }

    // }).finally(() => {
    //   this.isBannersCharged = true
    // })

    await this.http.get('https://intranet.surtilider.com:9001/IntranetSurti/WebServicesSurtiAppRest/getBanner', "", environment.headers)
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
    // await axios.get(`${environment.apiPath}/getDetailBanner?codigo=${bannerId}`, environment.headerConfig).then(response => {

    //   this.arrayDataProducts = []

    //   this.arrayDetailBanner = response.data.dataBanner

    //   for (let index = 0; index < response.data.dataProduct.length; index++) {
    //     const element = response.data.dataProduct[index];
    //     this.arrayDataProducts[index] = element
    //   }

    // })

    await this.http.get(`${environment.url}${environment.apiPath}getDetailBanner?codigo=${bannerId}`, "", environment.headers)
      .then(data => {

        const dataBennerTemp = JSON.parse(data.data)

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
