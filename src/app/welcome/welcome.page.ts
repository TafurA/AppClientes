import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { SessionGuard } from '../guard/session.guard';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  constructor(public loginService: LoginService, public nav: NavController) { }

  ngOnInit() {
    if (this.loginService.validateSession()) {
      this.nav.navigateForward("/tabs/home")
    }
  }

}
