import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BannerService } from 'src/app/services/banner.service';
@Component({
  selector: 'app-banner-product',
  templateUrl: './banner-product.component.html',
})
export class BannerProductComponent implements OnInit {

  public arrayDataProducts = new Array();
  public bannerId;

  constructor(public bannerService: BannerService, private rutaActiva: ActivatedRoute) { }

  ngOnInit() {
    this.getDataCurrentBanner()
  }

  getDataCurrentBanner() {
    this.bannerService.getBannerDetail(this.getActiveBannerId()).finally(() => {
      this.fillArrayProducts().then(() => {
        console.log(this.arrayDataProducts)
      })
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

  async fillArrayProducts() {
    this.arrayDataProducts = this.bannerService.arrayDataProducts
  }
}
