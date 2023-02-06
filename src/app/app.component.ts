import { Component } from '@angular/core';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { BannerComponent } from './components/banner/banner.component';
import { SessionGuard } from './guard/session.guard';
import { BannerService } from './services/banner.service';
import { FavoriteService } from './services/favorite.service';
import { LoginService } from './services/login.service';
import { ProductService } from './services/product.service';

import { ShopingCarService } from './services/shoping-car.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [HTTP, ShopingCarService, SessionGuard, BannerService, BannerComponent, LoginService, FavoriteService, ProductService]
})
export class AppComponent {
  public listAddress: []

  constructor(public shopingCarService: ShopingCarService, public productService: ProductService) {
  }

  ngOnInit() {
    this.closeAlert()
  }

  public addQuantitifyProductToCar() {
    const productId = document.querySelector(".js-alert-product").getAttribute("id");

    this.shopingCarService.addProductQuantity(productId)
  }

  public removeQuantitifyProductToCar() {
    const productId = document.querySelector(".js-alert-product").getAttribute("id");
    this.shopingCarService.removeProductQuantity(productId)
  }

  public closeAlert() {
    this.shopingCarService.closeAlert()
  }


}
