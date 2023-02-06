import { Component, OnInit } from '@angular/core';
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
  ) { }

  ngOnInit() {
    this.buildLoginForm();
  }

  private buildLoginForm() {
    const minPassLength = 4;
    this.loginForm = this.formBuilder.group({
      user: ['', Validators.required],
      password: ['', [
        Validators.required,
        Validators.minLength(minPassLength),
        // this.customValidator.validatePassword
      ]]
      // email: ['john@angular.io', [
      //   Validators.required, Validators.email
      // ]],
    });
  }

  public getError(controlName: any) {
    return this.customValidator.getError(controlName, this.loginForm);
  }

  public async loginToSystem() {
    const dataForm = this.loginForm.value;

    if (dataForm.user != "" || dataForm.password != "") {
      this.loginService.loginToSystem(dataForm.user, dataForm.password);
    }

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

}