import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController } from '@ionic/angular';

import { BannerService } from '../services/banner.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-detail-banner',
  templateUrl: './detail-banner.page.html',
})
export class DetailBannerPage implements OnInit {
  public arrayDataProducts = new Array();
  public bannerId;

  public banner = {
    imagen: ""
  }

  constructor(public bannerService: BannerService, private rutaActiva: ActivatedRoute, private loginService: LoginService, public navControler: NavController) { }

  ngOnInit() {
    this.getDataCurrentBanner()
  }

  getDataCurrentBanner() {
    this.bannerService.getBannerDetail(this.getActiveBannerId()).finally(() => {
      this.banner.imagen = this.bannerService.arrayDetailProductBanner()["imagen"]
    })
  }

  getActiveBannerId() {
    this.rutaActiva.params.subscribe(
      (params: Params) => {
        this.bannerId = params.bannerId;
      }
    );

    return this.bannerId;
  }

}
