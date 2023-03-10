import { Component, ElementRef, OnInit } from '@angular/core';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoginService } from '../services/login.service';
import { CustomValidator } from '../util/custom-validator';
import { HeaderBackComponent } from '../components/layout/header-back/header-back.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers: [HTTP, LoginService, CustomValidator, HeaderBackComponent]
})

export class LoginPage implements OnInit {

  public loginForm: FormGroup;

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private customValidator: CustomValidator,
    private el: ElementRef
  ) { }

  ngOnInit() {
    this.buildLoginForm();
  }

  private buildLoginForm() {
    const minPassLength = 4;
    const soloNumeros = "^[0-9]*$";
    this.loginForm = this.formBuilder.group({
      user: ['', [Validators.required, Validators.pattern(soloNumeros)]],
      password: ['', [
        Validators.required,
        Validators.minLength(minPassLength),
      ]]
    });
  }
  public getError(controlName: any) {
    return this.customValidator.getError(controlName, this.loginForm);
  }

  public async loginToSystem() {
    const dataForm = this.loginForm.value;

    if (dataForm.user != "" || dataForm.password != "") {
      this.loginService.loginToSystem(dataForm.user, dataForm.password).finally(() => {
        this.loginForm.reset()
      });
    }

  }

  passwordChange(e) {
    const inputToChange = e.target.closest(".o-form__field-wrap").querySelector("input")

    if (e.target.classList.contains("i-eye")) {
      e.target.classList.remove("i-eye")
      e.target.classList.add("i-eye-lock")
      inputToChange.type = 'text';
    } else {
      e.target.classList.add("i-eye")
      e.target.classList.remove("i-eye-lock")
      inputToChange.type = 'password';
    }

  }

}