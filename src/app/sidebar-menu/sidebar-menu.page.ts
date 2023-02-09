import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';

import { LoginService } from '../services/login.service';
import { BannerService } from '../services/banner.service';
import { NavController } from '@ionic/angular';
import { BannerComponent } from '../components/banner/banner.component';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.page.html',
  styleUrls: ['./sidebar-menu.page.scss'],
  providers: [HTTP, LoginService, BannerService, BannerComponent]
})
export class SidebarMenuPage implements OnInit {
  public userName = ""
  public userCashback = ""
  private refreshSubject = new Subject<void>();
  refresh$ = this.refreshSubject.asObservable();

  constructor(public loginService: LoginService, public navController: NavController) { }

  ngOnInit() {
    this.refresh$.subscribe(() => {
      this.validateSession()
    })

    setInterval(() => {
      this.refresh()
    }, 200)
  }

  refresh() {
    this.refreshSubject.next();
  }

  validateSession() {
    if (!this.loginService.validateSession()) {
      this.navController.navigateForward("/tabs/login")
    } else {
      this.setUserData()
    }
  }

  setUserData() {
    this.userName = `${this.loginService.validateSession()['nomcli_b']} ${this.loginService.validateSession()['ape1cli_b']}`
    this.userCashback = `${this.loginService.validateSession()['valor_acomulado']}`

    if (this.userCashback == "0.00") {
      this.userCashback = "0"
    }
  }

  logOut() {
    this.loginService.logOutIntoSystem()
  }

  toggleDropdown(e) {
    e.target.closest(
      ".c-navigation-support__item"
    ).classList.toggle("is-dropdown-show")
  }

}
