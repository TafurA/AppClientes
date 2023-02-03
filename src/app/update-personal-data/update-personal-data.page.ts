import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';

// Custom imports
import { UpdatePersonalDataService } from '../services/update-personal-data.service';
import { LoginService } from '../services/login.service';
import { UpdatePersonalData } from '../util/update-personal-data-validator';
@Component({
  selector: 'app-update-personal-data',
  templateUrl: './update-personal-data.page.html',
  styleUrls: ['./update-personal-data.page.scss'],
  providers: [UpdatePersonalData,LoginService,UpdatePersonalDataService, HTTP]
})
export class UpdatePersonalDataPage implements OnInit {

  public codcli_b !: string;
  public UpdateFormPersonal: FormGroup;
  constructor(    
    public loginService:LoginService,
    private updatePersonalDataService: UpdatePersonalDataService,
    private formBuilder: FormBuilder,
    private updatePersonalData: UpdatePersonalData) { }
  ngOnInit() {
    this.buildUpdateDataPersonalForm();
    this.setUserData();
  }
  private buildUpdateDataPersonalForm() {
      //documento
      const maxdocLength= 10;
      //PATERN NUMBER
      const soloNumeros ="^[0-9]*$";
    this.UpdateFormPersonal = this.formBuilder.group({
      documento:        [''],
      primerNombre:     [''],
      segundoNombre:    [''],
      primerApellido:   [''],
      segundoApellido:  [''],
      email:            ['',[
                             Validators.email,
                             Validators.required,
                            ]],
      telefono:         ['',[
                             Validators.pattern(soloNumeros), 
                             Validators.required,
                             Validators.minLength(maxdocLength),
                             Validators.maxLength(maxdocLength)  
                            ]]

      
    });
  }
  public getError(controlName: any) {
    return this.updatePersonalData.getError(controlName, this.UpdateFormPersonal);
  }


  setUserData() {
    this.UpdateFormPersonal.controls['documento'].disable();
    this.UpdateFormPersonal.controls['primerNombre'].disable();
    this.UpdateFormPersonal.controls['segundoNombre'].disable();
    this.UpdateFormPersonal.controls['primerApellido'].disable();
    this.UpdateFormPersonal.controls['segundoApellido'].disable();
    this.UpdateFormPersonal.controls['documento'].setValue(`${this.loginService.validateSession()['nitcli_b']}`);
    this.UpdateFormPersonal.controls['primerNombre'].setValue(`${this.loginService.validateSession()['nomcli_b']}`);
    this.UpdateFormPersonal.controls['segundoNombre'].setValue(`${this.loginService.validateSession()['nom2cli_b']}`);
    this.UpdateFormPersonal.controls['primerApellido'].setValue(`${this.loginService.validateSession()['ape1cli_b']}`);
    this.UpdateFormPersonal.controls['segundoApellido'].setValue(`${this.loginService.validateSession()['ape2cli_b']}`);

    this.UpdateFormPersonal.controls['telefono'].setValue(`${this.loginService.validateSession()['telcli_b']}`);
    this.UpdateFormPersonal.controls['email'].setValue(`${this.loginService.validateSession()['emacli_b']}`);
  }


  public async updateRegister() {
    const dataForm = this.UpdateFormPersonal.value;
    this.codcli_b=`${this.loginService.validateSession()['codcli_b']}`

    this.updatePersonalDataService.UpdateCustomer(
                                                  this.codcli_b,
                                                  dataForm.email,
                                                  dataForm.telefono);
    }
}
