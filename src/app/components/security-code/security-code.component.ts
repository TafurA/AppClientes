import { Component, AfterViewInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

// Custom imports
import { ForgotPasswordService } from 'src/app/services/forgot-password.service';

@Component({
  selector: 'app-security-code',
  templateUrl: './security-code.component.html',
  styleUrls: ['./security-code.component.scss'],
})
export class SecurityCodeComponent implements AfterViewInit {

  public intervalNumber = ""

  // Code security numbers
  public firstNumberCode = ""
  public secondNumberCode = ""
  public thirdNumberCode = ""
  public fourthNumberCode = ""

  public isTimerStop = false // Boolean for show or hidde message for reset code
  public loader: any

  constructor(public forgotPasswordService: ForgotPasswordService, public loadingController: LoadingController,) {
  }

  ngAfterViewInit() {
    const securityCodeInputs = document.querySelectorAll(".js-security-code-input")
    this.goToNextInput(securityCodeInputs)
    this.timerIntervalFunction();
  }

  goToNextInput(securityCodeInputs) {

    securityCodeInputs.forEach((ele, index) => {

      ele.addEventListener('keydown', (e) => {

        // if the keycode is backspace & the current field is empty
        // focus the input before the current. Then the event happens
        // which will clear the "before" input box.
        if (e.keyCode === 8 && e.target.value === '') {
          securityCodeInputs[Math.max(0, index - 1)].focus()
        }

        ele.addEventListener('input', (e) => {
          // take the first character of the input
          // this actually breaks if you input an emoji like 👨‍👩‍👧‍👦....
          // but I'm willing to overlook insane security code practices.
          const [first, ...rest] = e.target.value

          e.target.value = first ?? '' // first will be undefined when backspace was entered, so set the input to ""
          const lastInputBox = index === securityCodeInputs.length - 1
          const didInsertContent = first !== undefined

          if (didInsertContent && !lastInputBox) {
            // continue to input the rest of the string
            securityCodeInputs[index + 1].focus()
            securityCodeInputs[index + 1].value = rest.join('')
            securityCodeInputs[index + 1].dispatchEvent(new Event('input'))
          }

        })

      })

    })

  }

  timeFormat(duration = 0) {
    let minutes = ~~((duration % 3600) / 60);
    let seconds = ~~duration % 60;
    let min = minutes < 10 ? `0${minutes}` : minutes;
    let sec = seconds < 10 ? `0${seconds}` : seconds;
    return `${min} : ${sec}`;
  }

  timer(
    seconds = 60,
    target = document.querySelector(`.js-counter`),
  ) {
    if (target) {
      target.innerHTML = this.timeFormat(seconds);
      if (seconds < 0) {
        this.isTimerStop = true;
        target.innerHTML = `00 : 00`;
        return
      }
    }
    return window.setTimeout(() => this.timer(seconds - 1), 1100);
  }

  timerIntervalFunction() {
    const timerInterval = setInterval(() => {
      const target = document.querySelector(`.js-counter`);

      if (target) {
        if (target.innerHTML == "00 : 00") {
          this.isTimerStop = true
          clearInterval(timerInterval)
        }
      }


    }, 1000)
  }

  public async validateUserCredential() {
    this.showLoader()

    await this.forgotPasswordService.serviceCredentialValidate(this.getCredentialString()).then(() => {
      this.removeLoader()
      this.timer()
      this.isTimerStop = false

    });
  }

  setCredentialString(credentialString) {
    localStorage.setItem("credentialUser", credentialString);
  }

  getCredentialString() {
    return localStorage.credentialUser
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
