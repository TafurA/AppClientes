import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailProductPageRoutingModule } from './detail-product-routing.module';

import { DetailProductPage } from './detail-product.page';
import { HeaderComponent } from '../components/layout/header/header.component';
import { ListProductComponent } from '../components/product/list-product.component';
import { ProductComponent } from '../components/product/product/product.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailProductPageRoutingModule
  ],
  declarations: [DetailProductPage, HeaderComponent, ListProductComponent, ProductComponent]
})
export class DetailProductPageModule { }
