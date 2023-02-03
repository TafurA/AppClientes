import { Component, OnInit,ViewChild, ElementRef} from '@angular/core';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Custom imports

import { HeaderBackComponent } from '../components/layout/header-back/header-back.component';
import { UpdateCredentialsService } from '../services/update-credentials.service';
import { LoginService } from '../services/login.service';
import { CredentialsValidator } from '../util/update-credentials-validator';

@Component({
  selector: 'app-update-credentials',
  templateUrl: './update-credentials.page.html',
  styleUrls: ['./update-credentials.page.scss'],
  providers: [CredentialsValidator,LoginService,UpdateCredentialsService, HTTP,HeaderBackComponent]
})
export class UpdateCredentialsPage implements OnInit {

  public UpdateCredentialsForm: FormGroup;
  public passwordTypeInput  =  'password';
  public passwordInput  =  'password';
  public passwordCurrentInput  =  'password';
  public codcli_b !: string;

  constructor(
    public loginService:LoginService,
    private updateCredentialsService: UpdateCredentialsService,
    private formBuilder: FormBuilder,
    private credentialsValidator: CredentialsValidator,

    ) { }


    ngOnInit() {
      this.buildUpdatecredentialsForm();
      this.setUserData();
    }
    private buildUpdatecredentialsForm() {
      //validar minimo
      const mindocLength= 8;
      //PATERN 1 mayuscula 1 minuscula 1 numero 1 caracter especial
      const validarMayminCar ="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$";
      this.UpdateCredentialsForm = this.formBuilder.group(
        {
          PasswordNew:['',[
                          Validators.pattern(validarMayminCar),
                          Validators.minLength(mindocLength),
                          Validators.required
                          ]
                      ],
          validNewPassword:['',[
                                
                              Validators.pattern(validarMayminCar),
                              Validators.minLength(mindocLength),
                              Validators.required
                              ]
                            ],
          passCurrent: ['',[
                          Validators.required
                          ]
                      ]
        },
        {
          validators: this.credentialsValidator.validateMatchPassword
        }
      );
    }
  
    public getError(controlName: any) {
      return this.credentialsValidator.getError(controlName, this.UpdateCredentialsForm);
    }
    //ocultar/mostrar password
    @ViewChild('passwordEyeRegister', { read: ElementRef }) passwordEye: ElementRef;
    @ViewChild('passwordEye1', { read: ElementRef }) password: ElementRef;
    @ViewChild('passwordEye2', { read: ElementRef }) passwordCurrent: ElementRef; 
    togglePasswordMode() {
    this.passwordTypeInput = this.passwordTypeInput === 'text' ? 'password' : 'text';
    }
    togglePassword() {
      this.passwordInput = this.passwordInput === 'text' ? 'password' : 'text';
    }
    togglePasswordCurrent(){
      this.passwordCurrentInput = this.passwordCurrentInput === 'text' ? 'password' : 'text';
    }
  
    // borrar
    setUserData() {
      console.log(`${this.loginService.validateSession()['nitcli_b']}`);
    }
    public ConfirmPassword(){
      const dataForm= this.UpdateCredentialsForm.value;
      this.codcli_b=`${this.loginService.validateSession()['nitcli_b']}`
      // console.log(this.codcli_b);
      // console.log(dataForm.passCurrent);
      // console.log(dataForm.PasswordNew);
      // console.log(dataForm.validNewPassword);
      this.updateCredentialsService.UpdatecredentialsCustomer(this.codcli_b,dataForm.passCurrent,dataForm.PasswordNew)
  
    }
  }
