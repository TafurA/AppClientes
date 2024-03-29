import { Injectable } from '@angular/core';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { AlertController, NavController } from '@ionic/angular';
import axios from 'axios';

import { environment } from 'src/environments/environment';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  public arrayDataFavorites = new Array();
  public isFavorite = false;
  public isFavoriteNull = false;
  public alert;

  constructor(
    private alertController: AlertController,
    public loginService: LoginService,
    public nvCtrl: NavController,
    public http: HTTP
  ) { }

  async addProductToFavorite(product) {
    if (this.loginService.validateSession()) {
      await this.http.get(`${environment.url}${environment.apiPath}saveFavorite?nitcli_b=${this.getClientCode()}&codpro_b=${product}`, "", environment.headers)
        .then(data => {
          const dataObjTemp = JSON.parse(data.data)

          if (dataObjTemp.response) {
            this.presentAlert("Agregado a favoritos", dataObjTemp.message, "is-success")
            this.isFavorite = true;
          } else {
            this.presentAlert("Error al agregar a favorito", dataObjTemp.message, "is-error")
          }

        }).finally(() => {
          this.getFavoriteProductsList()
        })
        .catch(error => {
          console.log("error add favorite");
          console.log(error);
        });
    } else {
      console.log("USUARIO SIN SESESEION")
      this.nvCtrl.navigateForward("/tabs/login")
    }
  }

  async removeFavoriteProducts(product) {
    await this.http.get(`${environment.url}${environment.apiPath}removeFavorite?nitcli_b=${this.getClientCode()}&codpro_b=${product}`, "", environment.headers)
      .then(data => {
        const dataObjTemp = JSON.parse(data.data)

        if (dataObjTemp.response) {
          this.presentAlert("Eliminado de favoritos", dataObjTemp.message, "is-success")
          this.isFavorite = false;
        } else {
          this.presentAlert("Error eliminando de favoritos", dataObjTemp.message, "is-error")
        }

      }).finally(() => {
        this.getFavoriteProductsList()
      })
      .catch(error => {
        console.log("error remove favorite");
        console.log(error);
      });
  }

  productAddSuccess() {
    return this.isFavorite;
  }

  async getFavoriteProductsList() {
    this.arrayDataFavorites = []

    const codeBodCli = JSON.parse(localStorage.getItem("codeBodCli"))

    await this.http.get(`${environment.url}${environment.apiPath}getFavoritos?nitcli_b=${this.getClientCode()}&bodega=${codeBodCli}`, "", environment.headers)
      .then(data => {
        let dataObjTemp = JSON.parse(data.data)

        if (dataObjTemp.favorites) {
          window.localStorage.setItem("favoriteList", JSON.stringify(dataObjTemp.favorites))
          this.setIsFavoriteNull(false)
        } else {
          this.setIsFavoriteNull(true)
          window.localStorage.setItem("favoriteList", "0")
        }

      })
      .catch(error => {
        console.log("error favorite list");
        console.log(error);
      });
  }

  public arrayFavorites() {
    return this.arrayDataFavorites
  }

  async presentAlert(title: string, description: string, alertType: string) {
    this.alert = await this.alertController.create({
      header: title,
      subHeader: description,
      cssClass: `c-alert ${alertType}`
      // buttons: ['OK'],
    });

    await this.alert.present();

    setTimeout(() => {
      this.alert.dismiss()
    }, 2000)
  }

  public getIsFavoriteNull() {
    return this.isFavoriteNull
  }

  public setIsFavoriteNull(isFavoriteNull) {
    this.isFavoriteNull = isFavoriteNull
  }

  private getClientCode() {
    return this.loginService.validateSession()['codcli_b'];
  }

}
