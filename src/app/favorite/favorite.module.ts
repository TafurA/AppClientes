import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavoritePageRoutingModule } from './favorite-routing.module';

import { FavoritePage } from './favorite.page';
import { HeaderBackComponent } from '../components/layout/header-back/header-back.component';
import { GridProductComponent } from '../components/product/grid-product.component';
import { ProductComponent } from '../components/product/product/product.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavoritePageRoutingModule,
    NgxPaginationModule
  ],
  declarations: [FavoritePage, HeaderBackComponent, GridProductComponent, ProductComponent]
})
export class FavoritePageModule { }
