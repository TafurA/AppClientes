import { Component, OnInit } from '@angular/core';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { CategoryComponent } from '../components/category/category.component';
import { HeaderComponent } from '../components/layout/header/header.component';
import { GridProductComponent } from '../components/product/grid-product.component';
import { ProductComponent } from '../components/product/product/product.component';
import { CategoryService } from '../services/category.service';
import { LoginService } from '../services/login.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-offert',
  templateUrl: './offert.page.html',
  styleUrls: ['./offert.page.scss'],
  providers: [HTTP, CategoryService, LoginService, ProductService, HeaderComponent, CategoryComponent, GridProductComponent, ProductComponent]
})
export class OffertPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
