import { Injectable } from '@angular/core';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import axios from 'axios';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  public arrayDataCategory = new Array();
  public arrayDataSubCategory = new Array();
  public isSubCategoryCharged = false;

  constructor(private http: HTTP) {
  }

  async getCategoryList() {
    await this.http.get(`${environment.url}${environment.apiPath}getCategory`, "", environment.headers)
      .then(data => {

        const dataObjTemp = JSON.parse(data.data)
        for (let index = 0; index < dataObjTemp.data.length; index++) {
          const element = dataObjTemp.data[index];
          this.arrayDataCategory[index] = element
        }

      })
      .catch(error => {
        console.log("error categorias");
        console.log(error);
      });
  }

  async getSubCategoryList(idCategory) {
    const codeBodCli = JSON.parse(localStorage.getItem("codeBodCli"))
    await this.http.get(`${environment.url}${environment.apiPath}getSubCategory?codecategory=${idCategory}&bodega=${codeBodCli}`, "", environment.headers)
      .then(data => {

        this.arrayDataSubCategory = []
        localStorage.removeItem("test")

        const dataObjTemp = JSON.parse(data.data)
        for (const key in dataObjTemp.data) {

          const element = dataObjTemp.data[key];
          const dataSubCategory = {
            nameCategory: key,
            product: element
          }
          this.arrayDataSubCategory.push(dataSubCategory)
        }

        localStorage.setItem("test", JSON.stringify(this.arrayDataSubCategory))

      }).finally(() => {
        this.isSubCategoryCharged = true
      })
      .catch(error => {
        console.log("error sub categoria");
        console.log(error);

      });
  }

  public arrayCategory() {
    return this.arrayDataCategory;
  }

}
