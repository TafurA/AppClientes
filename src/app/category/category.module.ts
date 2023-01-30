import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoryPageRoutingModule } from './category-routing.module';

import { CategoryPage } from './category.page';
import { HeaderComponent } from '../components/layout/header/header.component';
import { CategoryComponent } from '../components/category/category.component';
import { GridProductComponent } from '../components/product/grid-product.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductComponent } from '../components/product/product/product.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoryPageRoutingModule,
    NgxPaginationModule
  ],
  declarations: [CategoryPage, HeaderComponent, CategoryComponent, GridProductComponent, ProductComponent]
})
export class CategoryPageModule { }
