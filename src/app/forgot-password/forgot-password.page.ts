import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CustomValidator } from 'src/app/util/custom-validator';
import { LoadingController } from '@ionic/angular';
import { SecurityCodeComponent } from '../components/security-code/security-code.component';
import { ForgotPasswordService } from '../services/forgot-password.service';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  providers: [CustomValidator, ForgotPasswordService, SecurityCodeComponent]
})

export class ForgotPasswordPage implements OnInit {

  public validateCredentialForm: FormGroup;
  public loader: any;
  public stepOne: boolean = false;

  public fullSecurityCode: any = 0;
  public emailString: any = "";

  public isTimerStop = false

  constructor(
    public forgotPasswordService: ForgotPasswordService,
    private formBuilder: FormBuilder,
    private customValidator: CustomValidator,
    public loadingController: LoadingController,
    public securityCodeComponent: SecurityCodeComponent
  ) {
  }

  ngOnInit() {
    this.buildValidateCredentialForm();
    this.validateLengthCodeSecurity();
  }

  // form.get('first')?.enable();
  // form.get('last')?.disable();

  private buildValidateCredentialForm() {
    this.validateCredentialForm = this.formBuilder.group({
      credential: ['', [Validators.required,]],
      code: ['', Validators.required],
      email: ['', Validators.required],
    });
  }


  public getError(controlName: any) {
    return this.customValidator.getError(controlName, this.validateCredentialForm);
  }

  public async validateUserCredential() {
    const dataForm = this.validateCredentialForm.value;

    this.showLoader()

    if (dataForm.credential != null) {
      await this.forgotPasswordService.serviceCredentialValidate(dataForm.credential).then(() => {
        this.removeLoader()

        if (this.forgotPasswordService.confirmData()[0]) {
          this.stepOne = true;
          this.emailString = this.forgotPasswordService.confirmData()[1]

          this.securityCodeComponent.timer(); // Init timer of security code

          // Save credential for re send a new code
          this.securityCodeComponent.setCredentialString(dataForm.credential);
        }

      });
    }

  }

  public async validateSecurityCode() {
    this.fullSecurityCode = document.querySelector(
      ".js-security-code").getAttribute("value");

    // 79836040
    await this.forgotPasswordService.serviceSecurityCodeValidate(
      this.fullSecurityCode, this.emailString)
  }

  public validateLengthCodeSecurity() {
    setInterval(() => {

      const secCode = document.querySelector(".js-security-code-text")

      if (secCode) {
        if (secCode.innerHTML.trim().length >= 0 && secCode.innerHTML.trim().length == 4) {
          this.isTimerStop = true
        } else {
          this.isTimerStop = false
        }
      }

    }, 100)
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
