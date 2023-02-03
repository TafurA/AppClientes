import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { AlertController, LoadingController, ModalController, NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';


// Custom imports
import { RegisterValidator } from 'src/app/util/register-validator';
import { HeaderBackComponent } from '../components/layout/header-back/header-back.component';
import { LoginService } from '../services/login.service';
import { RegisterService } from '../services/register.service';
// import { ModalDireccionComponent } from 'src/app/component/layout/modal-direccion/modal-direccion.component';
// import { LoginService } from 'src/app/service/login/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  providers: [RegisterValidator, HTTP, LoginService,RegisterService, HeaderBackComponent]
})
export class RegisterPage implements OnInit {
  public RegisterForm: FormGroup;
  //mostrar y ocultar
  public form1  !: String;
  public form1_1!: String;
  public form1_2!: string;
  public form2  !: String;
  public form3  !: String;
  public validarterminos!: String;
  public validar!: String;
  public nomenclatura !: string;
  public nomenclatura2 !: string;
  public otherNomen !: string;
  public textBotton !:string;
  public currentFood = undefined;
  public validarNomenc = undefined;
  //mostrar y ocultar
  public loader: any;
  public dataMunicipios: any;
  public listBarrios: any;
  public dataDireccion: any;
  public tipo1 = new Array;
  public tipo3 = new Array;
  public tipo5 = new Array;
  public tipo6 = new Array;
  public tipo7 = new Array;
  public message = 'S';
  //modal direccion
  @ViewChild(IonModal) modal: IonModal;

  constructor(
    private RegisterService: RegisterService,
    private formBuilder: FormBuilder,
    private registerValidator: RegisterValidator,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private alertController: AlertController,
    public nvCtrl: NavController,
  ) { }
  ngOnInit() {
    this.form1 = "G";
    this.form1_2 = "";
    this.form1_1 = "";
    this.form2 = "";
    this.form3 = "";
    this.nomenclatura = "";
    this.validarterminos = "";
    this.validar = "";
    this.BuildRegisterForm();
    this.municipios();
    this.barrios();
    this.DireccionNomenclaturas();
    this.validarExistenciaDireccion();
    this.textBotton ='Agregar Campos'; 
  }
  tipo = [
    {
      id: 'C',
      name: 'Cedula de ciudadanía',
    },
    {
      id: 'N',
      name: 'NIT',
    }
  ];

  public download(url) {
    window.open(url, "_blank");
  }

  private BuildRegisterForm() {
    //tipo
    const mintipoLength = 7;
    //documento
    const mindocLength = 5;
    const maxdocLength = 10;
    //Nombres y apellidos
    const minNomLength = 3;
    const maxNomLength = 28;
    //Razon Social
    const maxRazonSocialLength = 40;
    const maxEstablecimiento = 50
    //PATERN NUMBER
    const soloNumeros = "^[0-9]*$";
    //PATTERN LETRAS SIN ESPACIOS
    const letrasEspacio = '[a-zA-Z\s]*';
    const letras = '[a-zA-Z ]+$';
    const razonSocial='^[a-zA-Z0-9 .]+$';
    const email ='[^&#$%/!?¡]*';

    this.RegisterForm = this.formBuilder.group({
      tipo_doc: ['', [
        Validators.required
      ]],
      documento: ['', [
        Validators.required,
        Validators.pattern(soloNumeros),
        Validators.minLength(mindocLength),
        Validators.maxLength(maxdocLength)
      ]],
      primerNombre: ['', [
        Validators.required,
        Validators.pattern(letrasEspacio),
        Validators.minLength(minNomLength),
        Validators.maxLength(maxNomLength)
      ]],
      segundoNombre: ['', [
        Validators.pattern(letras),
        Validators.minLength(minNomLength)
      ]],
      primerApellido: ['', [
        Validators.required,
        Validators.pattern(letrasEspacio),
        Validators.minLength(minNomLength),
        Validators.maxLength(maxNomLength)

      ]],
      segundoApellido: ['', [
        Validators.pattern(letrasEspacio),
        Validators.minLength(minNomLength),
        Validators.maxLength(maxNomLength)

      ]],
      razonSocial: ['', [
        Validators.pattern(razonSocial),
        Validators.required,
        Validators.minLength(minNomLength),
        Validators.maxLength(maxRazonSocialLength)
      ]],
      digitoVer: ['', [
        Validators.required,
        Validators.pattern(soloNumeros),
        Validators.minLength(1),
        Validators.maxLength(1)
      ]],
      email: ['', [
        Validators.email,
        Validators.pattern(email),
        Validators.required,
        Validators.maxLength(maxRazonSocialLength)
      ]],
      telefono: ['', [
        Validators.pattern(soloNumeros),
        Validators.required,
        Validators.minLength(mintipoLength),
        Validators.maxLength(maxdocLength)
      ]],
      establecimiento: ['', [
        Validators.pattern(razonSocial),
        Validators.required,
        Validators.maxLength(maxEstablecimiento)
      ]],
      ver_direccion: ['', [
        Validators.required
      ]],
      barrio: ['', [
        Validators.required,
        Validators.maxLength(maxRazonSocialLength)
      ]],
      municipio: ['', [
        Validators.required,
        Validators.maxLength(maxRazonSocialLength)
      ]],
      vendedor: ['',],
      dirparam1: ['', Validators.required],
      dirparam2: ['',
        [Validators.required,
        Validators.pattern(soloNumeros)
        ]],
      dirparam3: [''],
      dirparam4: [''],
      dirparam5: ['',
        [Validators.required,
        Validators.pattern(soloNumeros)
        ]],
      dirparam6: [''],
      dirparam7: ['', [Validators.required,
      Validators.pattern(soloNumeros)
      ]],
      dirparam8: [''],
      dirparam9:       [''],
      dirparam10:       ['',Validators.pattern(soloNumeros)],
      dirparam11:       [''],
      dirparam12:       ['',Validators.pattern(soloNumeros)],
      tratamientoDatos: ['', Validators.required
      ]

    });
  }
  public getError(controlName: any) {
    return this.registerValidator.getError(controlName, this.RegisterForm);
  }

  // ocultar campos segun el tipo de dato
  public async obtenerTipoDoc(ev) {
    this.currentFood = ev.target.value;
    const dataForm = this.RegisterForm.value;
    if (dataForm.tipo_doc.id === "C") {
      this.form1_1 = "mostrar";
      this.form1_2 = "";
      this.RegisterForm.controls['razonSocial'].reset();
      this.RegisterForm.controls['digitoVer'].reset();
    }
    if (dataForm.tipo_doc.id === "N") {
      this.form1_2 = "mostrar";
      this.form1_1 = "";
      this.RegisterForm.controls['documento'].reset();
      this.RegisterForm.controls['primerNombre'].reset();
      this.RegisterForm.controls['segundoNombre'].reset();
      this.RegisterForm.controls['primerApellido'].reset();
      this.RegisterForm.controls['segundoApellido'].reset();
    }
  }
  // mostrar seccion datos personales
  public async continuarform1() {
    this.form1 = "g";
    this.form2 = "";
    this.form3 = "";
  }
  // mostrar seccion contacto
  public async continuarform2() {
    if ((this.RegisterForm.controls['tipo_doc'].invalid || this.RegisterForm.controls['documento'].invalid || this.RegisterForm.controls['digitoVer'].invalid || this.RegisterForm.controls['razonSocial'].invalid) && (this.RegisterForm.controls['tipo_doc'].invalid || this.RegisterForm.controls['documento'].invalid || this.RegisterForm.controls['primerNombre'].invalid || this.RegisterForm.controls['segundoNombre'].invalid || this.RegisterForm.controls['primerApellido'].invalid || this.RegisterForm.controls['segundoApellido'].invalid)) {
      this.form1 = "1";
      this.form2 = "";
      this.form3 = "";
      // this.RegisterService.presentAlert('Por favor Diligencie correctamente el formulario');
    }
    else {
      this.form1 = "";
      this.form2 = "g";
      this.form3 = "";
    }
  }
  // mostrar seccion entrega
  public async continuarform3() {
    if ((this.RegisterForm.controls['tipo_doc'].invalid || this.RegisterForm.controls['documento'].invalid || this.RegisterForm.controls['digitoVer'].invalid || this.RegisterForm.controls['razonSocial'].invalid) && (this.RegisterForm.controls['tipo_doc'].invalid || this.RegisterForm.controls['documento'].invalid || this.RegisterForm.controls['primerNombre'].invalid || this.RegisterForm.controls['segundoNombre'].invalid || this.RegisterForm.controls['primerApellido'].invalid || this.RegisterForm.controls['segundoApellido'].invalid)) {
      this.form1 = "1";
      this.form2 = "";
      this.form3 = "";
      this.RegisterService.presentAlert('Por favor Diligencie correctamente el formulario');
    } else if (this.RegisterForm.controls['email'].invalid || this.RegisterForm.controls['telefono'].invalid) {
      this.form1 = "";
      this.form2 = "2";
      this.form3 = "";
      this.RegisterService.presentAlert('Por favor Diligencie correctamente el formulario');
    } else {
      this.form1 = "";
      this.form2 = "";
      this.form3 = "3";
    }
  }
  // datos input municipios 
  public async municipios() {
    await this.RegisterService.tbl_municipios().then(() => {
      if (this.RegisterService.confirmDataMunicipios()[0]) {
        this.dataMunicipios = this.RegisterService.confirmDataMunicipios();
      } else {
        console.log("error");
      }
    });

  }
  // datos input barrios
  public async barrios() {
    await this.RegisterService.tbl_barrio().then(() => {
      if (this.RegisterService.confirmBarrios()[0]) {
        this.listBarrios = this.RegisterService.confirmBarrios();
      } else {
        console.log("error");
      }
    });
  }
  // //direccion
  public async DireccionNomenclaturas() {
    await this.RegisterService.DireccionNomenclaturas().then(() => {
      if (this.RegisterService.ConfirmDireccion()[0]) {
        this.dataDireccion = this.RegisterService.ConfirmDireccion();
        //extraer nomenclaturas
        this.tipo1 = this.dataDireccion.filter(objeto => objeto.tipo == 1);
        this.tipo3 = this.dataDireccion.filter(objeto => objeto.tipo == 3);
        this.tipo5 = this.dataDireccion.filter(objeto => objeto.tipo == 5);
        this.tipo6 = this.dataDireccion.filter(objeto => objeto.tipo == 6);
        this.tipo7 = this.dataDireccion.filter(objeto => objeto.tipo == 7);
      }
    });
  }
  // OTRAS NOMENCLATURAS DIRECCION
  public async otherNomenclatures(){

    if(this.otherNomen=='habilitar'){
      this.otherNomen='';
      this.textBotton ='Agregar Campos';
      this.RegisterForm.controls['dirparam9'].setValue('') ;
      this.RegisterForm.controls['dirparam10'].setValue('');
      this.RegisterForm.controls['dirparam11'].setValue('');
      this.RegisterForm.controls['dirparam12'].setValue('');

    }else{
      this.otherNomen='habilitar';
      this.textBotton ='Ocultar Campos';
      this.RegisterForm.controls['dirparam9'].setValue('') ;
      this.RegisterForm.controls['dirparam10'].setValue('');
      this.RegisterForm.controls['dirparam11'].setValue('');
      this.RegisterForm.controls['dirparam12'].setValue('');
    }
  }

  public async validarTerminos(ev) {
    if (ev.target.value) {
      this.validarterminos = "habilitar";
    } else {
      this.validarterminos = "";
    }
  }
  //validar nomenclatura
  public async validarNomenclatura(ev) {
    this.validarNomenc = ev.target.value;
    const dataForm = this.RegisterForm.value;
    if (dataForm.dirparam1 == "CL") {
      this.nomenclatura = "Mostrar";
    } else {
      this.nomenclatura = "";
    }
    if (dataForm.dirparam1 == "CR") {
      this.nomenclatura2 = "Mostrar";
    } else {
      this.nomenclatura2 = "";
    }
  }
  public async validarExistenciaDireccion() {

    if (this.RegisterForm.controls['ver_direccion'].invalid || this.RegisterForm.controls['ver_direccion'].value == " ") {
      this.validar = "";
      console.log(this.validar)
    } else {
      this.validar = "OK";
      console.log(this.validar)
    }

  }

  public async validarRegistro() {
    const dataForm = this.RegisterForm.value;

    if (dataForm.digitoVer) {
      dataForm.documento += "-" + dataForm.digitoVer;
      console.log(dataForm.documento);
    }
    dataForm.ver_direccion = dataForm.dirparam1 + ' ' +
      dataForm.dirparam2 + ' ' +
      dataForm.dirparam3 + ' ' +
      dataForm.dirparam4 + ' ' +
      dataForm.dirparam5 + ' ' +
      dataForm.dirparam6 + ' ' +
      dataForm.dirparam7 + ' ' +
      dataForm.dirparam8 +' ' +
      dataForm.dirparam9 +' ' +
      dataForm.dirparam10 +' ' +
      dataForm.dirparam11 + ' ' +
      dataForm.dirparam12;

    if (this.RegisterForm.controls['barrio'].valid && this.RegisterForm.controls['establecimiento'].valid && this.RegisterForm.controls['municipio'].valid && this.RegisterForm.controls['dirparam1'].valid && this.RegisterForm.controls['dirparam2'].valid && this.RegisterForm.controls['dirparam5'].valid && this.RegisterForm.controls['dirparam7'].valid) {
      this.RegisterService.RegisterToSystem(dataForm.tipo_doc.id,
        dataForm.documento,
        dataForm.primerNombre,
        dataForm.segundoNombre,
        dataForm.primerApellido,
        dataForm.segundoApellido,
        dataForm.razonSocial,
        dataForm.email,
        dataForm.telefono,
        dataForm.establecimiento,
        dataForm.ver_direccion,
        dataForm.barrio,
        dataForm.municipio,
        dataForm.vendedor);
    } else {
      this.RegisterService.presentAlert('Por favor Diligencie correctamente el formulario');
    }
  }
  //modal direccion
  cancel() {
    this.modal.dismiss(null, 'cancel');
  }
  confirm() {
    const dataForm = this.RegisterForm.value;
    this.modal.dismiss(dataForm.dirparam1 + ' ' +
      dataForm.dirparam2 + ' ' +
      dataForm.dirparam3 + ' ' +
      dataForm.dirparam4 + ' ' +
      dataForm.dirparam5 + ' ' +
      dataForm.dirparam6 + ' ' +
      dataForm.dirparam7 + ' ' +
      dataForm.dirparam8+ ' ' +
      dataForm.dirparam9+ ' ' +
      dataForm.dirparam10+ ' ' +
      dataForm.dirparam11+ ' ' +
      dataForm.dirparam12, 'confirm');

  }
  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `${ev.detail.data}`;
      const dataForm = this.RegisterForm.value;
      dataForm.ver_direccion = this.message;
      console.log(dataForm);

    }
  }

}
