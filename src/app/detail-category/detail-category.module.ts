import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailCategoryPageRoutingModule } from './detail-category-routing.module';

import { DetailCategoryPage } from './detail-category.page';
import { HeaderComponent } from '../components/layout/header/header.component';
import { CategoryComponent } from '../components/category/category.component';
import { CategoryProductComponent } from '../components/product/category-product.component';
import { ProductComponent } from '../components/product/product/product.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailCategoryPageRoutingModule
  ],
  declarations: [DetailCategoryPage, HeaderComponent, CategoryComponent, CategoryProductComponent, ProductComponent]
})
export class DetailCategoryPageModule { }
