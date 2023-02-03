import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { SessionGuard } from '../guard/session.guard';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  constructor(public sessionGuard: SessionGuard, public nav: NavController) { }

  ngOnInit() {
    // if (this.sessionGuard.canActivate()) {
    //   this.nav.navigateRoot("/tabs/home")
    // }
  }

}
