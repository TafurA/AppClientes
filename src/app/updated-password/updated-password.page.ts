import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CustomValidator } from 'src/app/util/custom-validator';
import { SecurityCodeComponent } from '../components/security-code/security-code.component';
import { ForgotPasswordService } from '../services/forgot-password.service';

@Component({
  selector: 'app-updated-password',
  templateUrl: './updated-password.page.html',
  providers: [CustomValidator, ForgotPasswordService, SecurityCodeComponent]
})

export class UpdatedPasswordPage implements OnInit {

  public updatedPasswordForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private customValidator: CustomValidator,
    private forgotPasswordService: ForgotPasswordService,
    public securityCodeComponent: SecurityCodeComponent
  ) { }

  ngOnInit() {
    this.buildUpdatedPasswordForm()
  }

  private buildUpdatedPasswordForm() {
    const minPassLength = 5;
    this.updatedPasswordForm = this.formBuilder.group(
      {
        passwordNew: ['', [
          Validators.required,
          // Validators.minLength(minPassLength),
        ]],
        passwordConfirm: ['', [
          Validators.required,
          Validators.minLength(minPassLength),
        ]]
      },
      {
        validators: this.customValidator.validateMatchPassword
      }
    );
  }

  public getError(controlName: any) {
    return this.customValidator.getError(controlName, this.updatedPasswordForm);
  }

  // update password
  public updatePassword() {
    const dataForm = this.updatedPasswordForm.value;

    this.forgotPasswordService.serviceUpdatePassword(
      this.securityCodeComponent.getCredentialString(),
      dataForm.passwordConfirm
    )
  }

}
