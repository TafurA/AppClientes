import { Component, OnInit ,ViewChild} from '@angular/core';
import { LoginService } from '../services/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShippingPointService } from '../services/shippingPoint.service';
import { RegisterService } from '../services/register.service';
import { RegisterValidator } from 'src/app/util/register-validator';
import { AlertController, IonModal, NavController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { HeaderBackComponent } from '../components/layout/header-back/header-back.component';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  providers: [HTTP, LoginService, ShippingPointService,RegisterService, RegisterValidator, HeaderBackComponent]
})

export class ProfilePage implements OnInit {

  public userName = ""
  public userDocument = ""
  public userCredential = ""
  public userPhone = ""
  public userEmal = ""

  //ACTUALIZAR
  public shippingPoint=""
  public neighborhood =""
  public validarNomenc =undefined
  public nomenclatura=""
  public nomenclatura2=""
  public otherNomen=""
  public textBotton ="Agregar nomenclaturas"
  public shippingForm: FormGroup
  public dataDireccion:any
  public tipo1 =new Array;
  public tipo3=new Array;
  public tipo5 =new Array;
  public tipo6 =new Array;
  public tipo7 =new Array;
  public alert: any;
  public dataMunicipios: any;
  public listBarrios: any;
  public isRemoved=false
  @ViewChild(IonModal) modal: IonModal;
  message: string;
  direccion: string;
  public ListPonts: any;

  //ACTUALIZAR --- NO BORRAR
  //---

  constructor( private loginService: LoginService,
    private formBuilder: FormBuilder,
    private registerValidator: RegisterValidator,

    private registerService:RegisterService,
    private shippingPointService:ShippingPointService,

    private alertController:AlertController) { }

  ngOnInit() {
    this.setUserData()

     //ACTUALIZAR --- NO BORRAR

     this.DireccionNomenclaturas()
     this.BuildshippingForm()
     this.municipios()
     this.barrios()
     this.ListShippingPoints()
     
     //ACTUALIZAR --- NO BORRAR
  }

  setUserData() {
    this.userName = `${this.loginService.validateSession()['nomcli_b']} ${this.loginService.validateSession()['ape1cli_b']}`
    this.userDocument = `${this.loginService.validateSession()['nitcli_b']}`
    this.userCredential = `${this.loginService.validateSession()['codcli_b']}`
    this.userPhone = `${this.loginService.validateSession()['telcli_b']}`
    this.userEmal = `${this.loginService.validateSession()['emacli_b']}`

    //-----------------
    this.shippingPoint = `${this.loginService.validateSession()['dircli_b']}`
    this.neighborhood = `${this.loginService.validateSession()['barcli_b']}`

    console.log(this.loginService.validateSession())
  }

  //------------------------------
  private BuildshippingForm() {
    const maxRazonSocialLength= 40;
    //PATERN NUMBER
    const soloNumeros ="^[0-9]*$";
    this.shippingForm = this.formBuilder.group({
      // ver_direccion:  [ '',[
      //                   Validators.required
      //                 ]],
      barrio:         ['',[
                        Validators.required,
                        Validators.maxLength(maxRazonSocialLength) 
                      ]],  
      municipio:       ['',[
                        Validators.required,
                        Validators.maxLength(maxRazonSocialLength)
                       ]],
      dirparam1:       ['',[Validators.required]],
      dirparam2:       ['',
                        [Validators.required, 
                        Validators.pattern(soloNumeros)
                      ]],
      dirparam3:       [''],
      dirparam4:       [''],
      dirparam5:       ['',
                          [Validators.required,
                          Validators.pattern(soloNumeros)
                        ]],
      dirparam6:       [''],
      dirparam7:       ['',[Validators.required,
                          Validators.pattern(soloNumeros)
                        ]],
      dirparam8:       [''],
      dirparam9:       [''],
      dirparam10:       ['',Validators.pattern(soloNumeros)],
      dirparam11:       [''],
      dirparam12:       ['',Validators.pattern(soloNumeros)],
      
    });
  }
  public getError(controlName: any) {
    return this.registerValidator.getError(controlName, this.shippingForm);
  }


  //ACTUALIZAR ENVIAR SOLICITUD DE ELIMINAR O CREAR PUNTOS DE ENVÍO --- NO BORRAR

     // datos input municipios 
  public async municipios(){
    await this.registerService.tbl_municipios().then(() => {
      if (this.registerService.confirmDataMunicipios()[0]) {
        this.dataMunicipios =this.registerService.confirmDataMunicipios();
      }else{
        console.log("error");
      }
    });
    
  }
    // datos input barrios
  public async barrios(){
      await this.registerService.tbl_barrio().then(() => {
        if (this.registerService.confirmBarrios()[0]) {
          this.listBarrios =this.registerService.confirmBarrios();
        }else{
          console.log("error");
        }
      });
  }
  // nomenclaturas dirección
  public async DireccionNomenclaturas(){
    await this.registerService.DireccionNomenclaturas().then(() => {
      if (this.registerService.ConfirmDireccion()[0]) {
        this.dataDireccion =this.registerService.ConfirmDireccion();
        //extraer nomenclaturas
        console.log(this.dataDireccion)
        console.log("this.dataDireccion")
        this.tipo1= this.dataDireccion.filter(objeto=>objeto.tipo==1);
        this.tipo3= this.dataDireccion.filter(objeto=>objeto.tipo==3);
        this.tipo5= this.dataDireccion.filter(objeto=>objeto.tipo==5);
        this.tipo6= this.dataDireccion.filter(objeto=>objeto.tipo==6);
        this.tipo7= this.dataDireccion.filter(objeto=>objeto.tipo==7);
        // console.log(this.tipo1);
      }
    });
  } 
  //validar nomenclatura
  public async validarNomenclatura(ev){
    this.validarNomenc = ev.target.value;
    const dataForm = this.shippingForm.value;
    if (dataForm.dirparam1 == "CL" ){
      this.nomenclatura="Mostrar";
    }else{
      this.nomenclatura="";
    }
    if(dataForm.dirparam1 == "CR" ){
      this.nomenclatura2="Mostrar";
    }else{
      this.nomenclatura2="";
    }
  }

  //   // OTRAS NOMENCLATURAS DIRECCION -- NO BORRAR
  public async otherNomenclatures(){
    if(this.otherNomen=='habilitar'){
      this.otherNomen='';
      this.textBotton ='Agregar Campos';
      this.shippingForm.controls['dirparam9'].setValue('') ;
      this.shippingForm.controls['dirparam10'].setValue('');
      this.shippingForm.controls['dirparam11'].setValue('');
      this.shippingForm.controls['dirparam12'].setValue('');

    }else{
      this.otherNomen='habilitar';
      this.textBotton ='Ocultar Campos';
      this.shippingForm.controls['dirparam9'].setValue('') ;
      this.shippingForm.controls['dirparam10'].setValue('');
      this.shippingForm.controls['dirparam11'].setValue('');
      this.shippingForm.controls['dirparam12'].setValue('');
    }
  }

  // // OTRAS NOMENCLATURAS DIRECCION -- NO BORRAR
  // modal direccion
  confirm() {
    const dataForm = this.shippingForm.value;
    this.modal.dismiss( dataForm.dirparam1 +' '+
    dataForm.dirparam2 + ' '+
    dataForm.dirparam3 +' '+
    dataForm.dirparam4 +' '+
    dataForm.dirparam5 +' '+
    dataForm.dirparam6 +' '+
    dataForm.dirparam7 +' '+
    dataForm.dirparam8 + ' '+
    dataForm.dirparam9 + ' '+
    dataForm.dirparam10 + ' '+
    dataForm.dirparam11 + ' '+
    dataForm.dirparam12
    , 'confirm');

  }

    cancel() {
      this.modal.dismiss(null, 'cancel');       
      this.shippingForm.setValue({dirparam1:'',
      dirparam2:'',
      dirparam3:'',
      dirparam4:'',
      dirparam5:'',
      dirparam6:'',
      dirparam7:'',
      dirparam8:'',
      dirparam9:'',
      dirparam10:'',
      dirparam11:'',
      dirparam12:'',
      barrio:'',
      municipio:''
    }) 
    }
    onWillDismiss(event: Event) { 
      const ev = event as CustomEvent<OverlayEventDetail<string>>;
      if (ev.detail.role === 'confirm') {
        const dataForm = this.shippingForm.value;
        this.direccion = `${ev.detail.data}`;
        dataForm.ver_direccion = this.message;
  

        this.shippingPointService.addShippingPoint(this.userCredential, dataForm.barrio, dataForm.municipio,this.direccion) 
        console.log(this.shippingForm)

        this.shippingForm.setValue({dirparam1:'',
                                    dirparam2:'',
                                    dirparam3:'',
                                    dirparam4:'',
                                    dirparam5:'',
                                    dirparam6:'',
                                    dirparam7:'',
                                    dirparam8:'',
                                    dirparam9:'',
                                    dirparam10:'',
                                    dirparam11:'',
                                    dirparam12:'',
                                    barrio:'',
                                    municipio:''
                                  })
      }else{
        this.shippingForm.setValue({dirparam1:'',
                                    dirparam2:'',
                                    dirparam3:'',
                                    dirparam4:'',
                                    dirparam5:'',
                                    dirparam6:'',
                                    dirparam7:'',
                                    dirparam8:'',
                                    dirparam9:'',
                                    dirparam10:'',
                                    dirparam11:'',
                                    dirparam12:'',
                                    barrio:'',
                                    municipio:''
                                  })
      }
  }
  public removeShippingPoint(element){
    this.presentAlert().finally(() => {

      if (this.isRemoved) {
        this.shippingPointService.showLoader()
        this.shippingPointService.removeShippingPoint(element)
      }

    })
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: '¿Quieres eliminar este punto de envío?',
      cssClass: 'c-alert c-alert_product is-success',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.isRemoved= false;
          },
        },
        {
          text: 'Aceptar',
          role: 'confirm',
          handler: () => {
            this.isRemoved = true;
          },
        },
      ],
    });

    await alert.present();
    await alert.onDidDismiss();
  }

  //ACTUALIZAR ENVIAR SOLICITUD DE ELIMINAR O CREAR PUNTOS DE ENVÍO --- NO BORRAR



  //------------------------------


  //------- listar puntos de envío


  public async ListShippingPoints(){
    const identificacion=this.loginService.validateSession()['nitcli_b']
    await this.shippingPointService.ListShippingPoint(identificacion).then(() => {
      if (this.shippingPointService.ListShippingPointData()) {
        this.ListPonts =this.shippingPointService.ListShippingPointData();
        console.log(this.ListPonts);
        console.log("this.ListPonts =this.shippingPointService.ListShippingPointData()");
        console.log("this.ListPonts =this.shippingPointService.ListShippingPointData()");
      }else{
        console.log("error");
      }
    });
    
  }
  // -------------------


}
