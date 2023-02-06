import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OffertPageRoutingModule } from './offert-routing.module';

import { NgxPaginationModule } from 'ngx-pagination'

import { OffertPage } from './offert.page';
import { HeaderComponent } from '../components/layout/header/header.component';
import { CategoryComponent } from '../components/category/category.component';
import { GridProductComponent } from '../components/product/grid-product.component';
import { ProductComponent } from '../components/product/product/product.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OffertPageRoutingModule,
    NgxPaginationModule
  ],
  declarations: [OffertPage, HeaderComponent, GridProductComponent, ProductComponent]
})
export class OffertPageModule { }
