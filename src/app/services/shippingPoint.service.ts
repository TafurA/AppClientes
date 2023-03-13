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
  public ListPonts=[];

  constructor(public nvCtrl: NavController,  private alertController: AlertController, public sessionGuard: SessionGuard,private loadingController: LoadingController, private http: HTTP) {
  }

// ----------------- 
async ListShippingPoint(identificacion: string){
  await this.http.get(`${environment.url}${environment.apiPath}customerClient?identificacion=${identificacion}`,"", environment.headers).then(data => {
    const dataPointsTemp = JSON.parse(data.data)


    console.log(dataPointsTemp)
    console.log("dataPointsTemp")
    if (dataPointsTemp.response) {

      dataPointsTemp.data.forEach(element => {
        const data = {
          codcli_b: element.codcli_b,
          barcli_b: element.barcli_b,
          dircli_b: element.dircli_b
        }
        this.ListPonts.push(data)
      });

      console.log("Correcto, puntos de envío listados")
      console.log(this.ListPonts)
      console.log("this.ListPonts")
    
    }else{
      console.log("Ocurrio un error");
    }
  }).catch((error) => {
  console.log("error.status");
  console.log(error)
  })
}
public ListShippingPointData(): Object {
  this.ListPonts;
  return this.ListPonts;
}
// ----------------




  async addShippingPoint(codigo: string,
    barrio: string,
    municipio:string,
    direccion:string){
    await this.http.get(`${environment.url}${environment.apiPath}addShippingPoint?codigo=${codigo}&dircli_b=${direccion}&barcli_b=${barrio}&ciucli_b=${municipio}`,"", environment.headers).then(data => {

      const dataLoginTemp = JSON.parse(data.data)
      if (dataLoginTemp.response) {
        this.removeLoader()    
        this.presentAlert("¡Exelente!",dataLoginTemp.message, "is-success");
        this.nvCtrl.navigateForward("/tabs/profile");
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
