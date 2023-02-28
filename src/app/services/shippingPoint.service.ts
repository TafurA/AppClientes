import { Injectable } from '@angular/core';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';

// Connect with http
import axios from 'axios';
import { SessionGuard } from 'src/app/guard/session.guard';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShippingPointService {

  public dataDireccion=[];
  public alert;
  public loader: any;

  constructor(public nvCtrl: NavController,  private alertController: AlertController, public sessionGuard: SessionGuard,private loadingController: LoadingController, private http: HTTP) {
  }

  async addShippingPoint(codigo: string,
    barrio: string,
    municipio:string,
    direccion:string){
    await this.http.get(`${environment.url}${environment.apiPath}addShippingPoint?codigo=${codigo}&dircli_b=${direccion}&barcli_b=${barrio}&ciucli_b=${municipio}`,"", environment.headers).then(data => {

      const dataLoginTemp = JSON.parse(data.data)
      if (dataLoginTemp.response) {
        this.presentAlert("¡Exelente!",dataLoginTemp.message, "is-success");
        this.nvCtrl.navigateForward("/profile");
        this.removeLoader()    
      }else{
        this.presentAlert("¡Error!",dataLoginTemp.message, "is-error");
      }
    }).catch((error) => {
    console.log("error.status");
    console.log(error)
    })
  }
  async removeShippingPoint(codigo: string){
    
      await this.http.get(`${environment.url}${environment.apiPath}inactivateShippingPoint?codigo=${codigo}`,"", environment.headers).then(data => {
        const dataLoginTemp = JSON.parse(data.data)
        console.log(dataLoginTemp);
        if (dataLoginTemp.response) {
        this.presentAlert("¡Exelente!",dataLoginTemp.message, "is-success");
        this.removeLoader()    
      }else{
        this.presentAlert("¡Error!",dataLoginTemp.message, "is-error");
      }
    }).catch((error) => {
    console.log("error.status");
    console.log(error)
    })
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
    }, 4000)
  }
  async showLoader() {
    this.loader = await this.loadingController.create({
      spinner: "bubbles",
      translucent: true,
      cssClass: 'o-loader'
    });
    await this.loader.present();
  }

  async removeLoader() {
    this.loader = await this.loadingController.dismiss();
  }



  

 
}
