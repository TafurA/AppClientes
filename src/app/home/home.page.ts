import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';

import { LoginService } from '../services/login.service';
import { BannerService } from '../services/banner.service';
import { BannerComponent } from '../components/banner/banner.component';
import { MarcasComponent } from '../components/marcas/marcas.component';
import { MarcasService } from '../services/marcas.service';
import { CategoryComponent } from '../components/category/category.component';
import { CategoryService } from '../services/category.service';
import { ProductService } from '../services/product.service';
import { ProductComponent } from '../components/product/product/product.component';
import { ListProductComponent } from '../components/product/list-product.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  providers: [
    HTTP,
    LoginService,
    BannerService,
    MarcasService,
    CategoryService,
    ProductService,
    BannerComponent,
    MarcasComponent,
    CategoryComponent,
    ProductComponent,
    ListProductComponent
  ]
})
export class HomePage implements OnInit {

  constructor(private loginService: LoginService,) {
  }

  ngOnInit() {
  }

}
