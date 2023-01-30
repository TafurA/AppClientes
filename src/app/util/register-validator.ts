import { AbstractControl, FormGroup } from '@angular/forms';

export class RegisterValidator {

  /**
   * Custom message for the inputs error of form.
  */
  messageValidation: any = {  'required': 'Este campo es obligatorio', 'minLength': 'Este campo tiene un minimo de caracteres', 'maxLength':'Este campo tiene un máximo de caracteres', 'pattern': 'No es el formato solicitado','email': 'El valor ingresado no es un email.'};

  constructor() { }


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
        } else if(control.errors.maxlength){
          error = this.messageValidation.maxLength;
        }else if (control.errors.pattern) {
          error = this.messageValidation.pattern;
        }else if (control.errors.email) {
          error = this.messageValidation.email;
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
