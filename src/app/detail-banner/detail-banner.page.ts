import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CategoryComponent } from '../components/category/category.component';

import { BannerService } from '../services/banner.service';
import { CategoryService } from '../services/category.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-detail-banner',
  templateUrl: './detail-banner.page.html',
  providers: [CategoryService, CategoryComponent]
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
      console.log("this.bannerService.arrayDetailProductBanner()")
      console.log(this.bannerService.arrayDetailProductBanner())
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
