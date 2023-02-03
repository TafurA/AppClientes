import { Injectable } from '@angular/core';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { AlertController, NavController } from '@ionic/angular';
// Connect with http
import axios from 'axios';

// Global config
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  data_peticion = [];
  dataBarrios = [];
  dataDireccion = [];
  public nombre: string;
  constructor(public nvCtrl: NavController, private alertController: AlertController, private http: HTTP) {
  }

  async DireccionNomenclaturas() {
    
    await this.http.get(`${environment.url}${environment.apiPath}ComboDireccionApp`, "",environment.headers)
      .then(data => {

        const dataObjTemp = JSON.parse(data.data)

        if (dataObjTemp.data) {
          this.dataDireccion = dataObjTemp.data;
        } else {
          console.log("Ocurrío un error al traer las nomenclaturas de la dirección ");
        }

      })
      .catch(error => {
        console.log("error ComboDireccionApp");
        console.log(error);
      });
  }
  public ConfirmDireccion(): Object {
    this.dataDireccion;
    return this.dataDireccion;
  }

  // //municipios
  async tbl_municipios() {

    await this.http.get(`${environment.url}${environment.apiPath}ComboMunicipios`,"",environment.headers)
    .then(data => {
      const dataObjTemp = JSON.parse(data.data)
      if (dataObjTemp.data) {
        this.data_peticion = dataObjTemp.data;
      }
      else {
        console.log("Ocurrío un error al traer los municipios ");
      }
    }).catch((error) => {
      console.log("error.status");
      console.log(error)
    })
  }
  public confirmDataMunicipios(): Object {
    this.data_peticion;
    return this.data_peticion;
  }
  // //Barrios
  async tbl_barrio() {

    await this.http.get(`${environment.url}${environment.apiPath}ComboBarrios`,"",environment.headers)
    .then(data => {
      const dataObjTemp = JSON.parse(data.data)
      if (dataObjTemp.data) {
        this.dataBarrios = dataObjTemp.data;
      } else {
        console.log("Ocurrío un error al traer los barrios ");
      }
    }).catch((error) => {
      console.log("ocurrioun problema al traer los barrios");
      console.log(error)
    })

  }
  public confirmBarrios(): Object {
    this.dataBarrios;
    return this.dataBarrios;
  }
  async RegisterToSystem(tipo_doc: string,
    documento: number,
    primerNombre: string,
    segundoNombre: string,
    primerApellido: string,
    segundoApellido: string,
    razonSocial: string,
    email: string,
    telefono: number,
    establecimiento: string,
    ver_direccion: string,
    barrio: string,
    municipio: string,
    vendedor: string) {

    if (razonSocial) {
      this.nombre = razonSocial;
    } else if (primerNombre) {
      this.nombre = primerNombre;
    }
    if (vendedor == "") {
      vendedor = 'admsist'
      console.log(vendedor);
    } else {
      console.log(vendedor);

    }


    await this.http.get(`${environment.url}${environment.apiPath}preRegistroCliente?tipo_doc=${tipo_doc}&nomcli_b=${this.nombre}&nom2cli_b=${segundoNombre}&ape1cli_b=${primerApellido}&ape2cli_b=${segundoApellido}&nitcli_b=${documento}&dircli_b=${ver_direccion}&ciucli_b=${municipio}&telcli_b=${telefono}&empcli_b=${establecimiento}&emailcli_b=${email}&barcli_b=${barrio}&vendedor=${vendedor}`,"", environment.headers)
    .then(data => {
      const dataObjTemp = JSON.parse(data.data)
      if (dataObjTemp.response) {

        this.presentAlertRegister("¡Exelente! Muy pronto nos estaremos comunicando con usted para asignarle sus credenciales.");
        this.nvCtrl.navigateForward("/tabs/welcome");
      } else {
        console.log("no PASO")
        this.presentAlert(dataObjTemp.message);

      }

    }).catch((error) => {
      console.log("error.status");
      console.log(error)
    })

  }

  async presentAlert(description: string) {
    let imagen = "../assets/image/interaccion_Registro.png";
    const alert = await this.alertController.create({

      // header: ,
      message: `<img src="${imagen}"><br>` + description,
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'Aceptar',
          cssClass: 'alert-button-confirm',
        },
      ],
    });


    await alert.present();
  }
  async presentAlertRegister(description: string) {
    let imagen = "../assets/image/interaccion_Register.png";
    const alert = await this.alertController.create({

      message: `<img src="${imagen}"><br>` + description,
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'Aceptar',
          cssClass: 'alert-button-confirm',
          handler: () => {
            this.nvCtrl.navigateForward("/tabs/welcome")
          },
        },
      ],
    });
    await alert.present();
  }


}

