import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
})

export class ProfilePage implements OnInit {

  public userName = ""
  public userDocument = ""
  public userCredential = ""
  public userPhone = ""
  public userEmal = ""

  constructor(public loginService: LoginService,) { }

  ngOnInit() {
    this.setUserData()
  }

  setUserData() {
    this.userName = `${this.loginService.validateSession()['nomcli_b']} ${this.loginService.validateSession()['ape1cli_b']}`
    this.userDocument = `${this.loginService.validateSession()['nitcli_b']}`
    this.userCredential = `${this.loginService.validateSession()['codcli_b']}`
    this.userPhone = `${this.loginService.validateSession()['telcli_b']}`
    this.userEmal = `${this.loginService.validateSession()['emacli_b']}`
  }

}
