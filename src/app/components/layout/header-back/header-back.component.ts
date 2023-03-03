import { Component, OnInit } from '@angular/core';
import { HTTP } from '@awesome-cordova-plugins/http';
import { NavController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header-back',
  templateUrl: './header-back.component.html',
  styleUrls: ['./header-back.component.scss'],
})
export class HeaderBackComponent implements OnInit {

  /**
   * Represents a HeaderBackComponent.
   * @constructor
   * @param {NavController} navCtrl - The object for controller the navigation.
  */
  constructor(public navCtrl: NavController, public loginService: LoginService) { }

  ngOnInit() { }

  /**
   * Return the navigation to the prev page.
   * @return this.navCtrl.back() Function of the object NavController
  */
  clickToGoBack() {

    setTimeout(() => {

      if (this.loginService.validateSession()) {
        return this.navCtrl.back()
      } else {
        return this.navCtrl.navigateForward("/tabs/welcome")
      }

    }, 1000)
  }
}
