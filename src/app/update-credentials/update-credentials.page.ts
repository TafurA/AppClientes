import { Component, OnInit} from '@angular/core';
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

    passwordChange(e) {
      const inputToChange = e.target.closest(".o-form__field-wrap").querySelector("input")
      if (e.target.classList.contains("i-eye")) {
        e.target.classList.remove("i-eye")
        e.target.classList.add("i-eye-lock")
        inputToChange.setAttribute("type", "text")
      } else {
        e.target.classList.add("i-eye")
        e.target.classList.remove("i-eye-lock")
        inputToChange.setAttribute("type", "password")
      }
  
      console.log("e.target")
      console.log(e.target)
  
    }

    setUserData() {
      console.log(`${this.loginService.validateSession()['nitcli_b']}`);
    }
    public ConfirmPassword(){
      const dataForm= this.UpdateCredentialsForm.value;
      this.codcli_b=`${this.loginService.validateSession()['nitcli_b']}`
      this.updateCredentialsService.UpdatecredentialsCustomer(this.codcli_b,dataForm.passCurrent,dataForm.PasswordNew)
  
    }
  }
