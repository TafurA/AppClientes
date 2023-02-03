import { AbstractControl, FormGroup  } from '@angular/forms';

export class CredentialsValidator {

  /**
   * Custom message for the inputs error of form.
  */
  messageValidation: any = {
    'required': 'Este campo es obligatorio',
    'minLength': 'La contraseña debe contener mas de 8 caracteres ',
    'passwordMatch': 'Las contraseñas no coinciden',
    'pattern': 'Tu nueva contraseña debe tener MAYÚSCULAS, MINÚSCULAS, NÚMEROS y CARACTERES no alfanuméricos '
  };

  constructor() { }

  public validateMatchPassword(control: AbstractControl) {
    const password = control.get('PasswordNew').value;
    const passwordConfirm = control.get('validNewPassword').value;

    // Compare if the password match
    if (password !== passwordConfirm) {
      control.get('validNewPassword').setErrors({ NoPasswordMatch: true })
      
    }
  }
  public validateMatchPasswordCredential(control: AbstractControl) {
    const password = control.get('password').value;
    const passwordConfirm = control.get('passwordConfirm').value;

    // Compare if the password match
    if (password !== passwordConfirm) {
      control.get('passwordConfirm').setErrors({ NoPasswordMatch: true })
      
    }
  }

  /**
   * Show and validate the respective error of input.
   * @param {String} controlName - Related name´s of the input.
   * @param {FormGroup} formGroup - Parent form, must be and object of FormGroup.
   * @return {String} Message of the respective error.
  */
  public getError(controlName: string, formGroup: FormGroup): string {
    let error = '';
    const control = formGroup.get(controlName);

    if (control.touched && control.errors != null) {
      error = JSON.stringify(control.errors);

      if (control.errors.required) {
        error = this.messageValidation.required;
      } else if (control.errors.minlength) {
        error = this.messageValidation.minLength;
      } else if (control.errors.NoPasswordMatch) {
        error = this.messageValidation.passwordMatch
      }else if(control.errors.pattern){
        error = this.messageValidation.pattern
      }
      this.addClassToError(controlName, true);
    } else {
      this.addClassToError(controlName, false);
    }

    return error;
  }

  public addClassToError(controlName: any, showError: boolean) {
    const inputElement = document.querySelector(`[formControlName='${controlName}']`)
    const parentInput = inputElement.closest('.o-form__field');

    if (showError) {
      parentInput.classList.add("is-field-error")
    } else {
      parentInput.classList.remove("is-field-error")
    }
  }


}
