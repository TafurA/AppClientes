import { Component, OnInit } from '@angular/core';
import { HeaderBackComponent } from '../components/layout/header-back/header-back.component';
import { GridProductComponent } from '../components/product/grid-product.component';
import { ProductComponent } from '../components/product/product/product.component';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
  providers: [HeaderBackComponent, GridProductComponent, ProductComponent]
})
export class FavoritePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
