import { Component, OnInit } from '@angular/core';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { BannerComponent } from '../components/banner/banner.component';
import { BannerService } from '../services/banner.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.page.html',
  styleUrls: ['./sidebar-menu.page.scss'],
  providers: [HTTP, LoginService, BannerService, BannerComponent]
})
export class SidebarMenuPage implements OnInit {
  public userName = ""
  public userCashback = ""
  constructor(public loginService: LoginService) { }

  ngOnInit() {
    this.setUserData()
  }

  setUserData() {
    this.userName = `${this.loginService.validateSession()['nomcli_b']} ${this.loginService.validateSession()['ape1cli_b']}`
    this.userCashback = `${this.loginService.validateSession()['valor_acomulado']}`
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
