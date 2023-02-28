import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

import { LoginService } from '../services/login.service';
import { BannerService } from '../services/banner.service';

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

  constructor(
    public loginService: LoginService,
    public navController: NavController,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.initChat()
  }

  ionViewDidEnter() {
    const shouldCache = this.route.snapshot.data.cache !== false;
    if (!shouldCache) {
      this.cdr.markForCheck();
      this.validateSession();
    } else {
      this.validateSession();
    }
  }

  // Custom chat init
  initChat() {
    (function () { var ldk = document.createElement('script'); ldk.type = 'text/javascript'; ldk.async = true; ldk.src = 'https://s.cliengo.com/weboptimizer/607f436680b80a002a5056b7/63f7e25f6a109300257b7523.js?platform=view_installation_code'; var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ldk, s); })();
  }

  validateSession() {
    if (!localStorage.userSessionData) {
      this.navController.navigateForward("/tabs/login")
    } else {
      this.setUserData()
    }
  }

  setUserData() {
    this.userName = `${this.loginService.validateSession()['nomcli_b']} ${this.loginService.validateSession()['ape1cli_b']}`
    this.userCashback = `${this.loginService.validateSession()['valor_acomulado']}`

    if (this.userName.includes("undefined")) {
      this.navController.navigateForward("/tabs/welcome")

    } else {
      if (this.userCashback == "0.00") {
        this.userCashback = "0"
      } else {
        this.userCashback = parseFloat(this.userCashback).toFixed(3)
      }
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
