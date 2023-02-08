import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import {
  PushNotifications,
} from '@capacitor/push-notifications';

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
      PushNotifications.requestPermissions().then(result => {
        if (result.receive === 'granted') {
          // Register with Apple / Google to receive push via APNS/FCM
          PushNotifications.register();
        } else {
          // Show some error
          console.log("error en alertas")
        }
      }).finally(() => {
        this.nav.navigateForward("/tabs/home")
      });
    }

  }

}
