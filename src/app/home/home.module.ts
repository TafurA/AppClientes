import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { BannerComponent } from '../components/banner/banner.component';
import { MarcasComponent } from '../components/marcas/marcas.component';
import { CategoryComponent } from '../components/category/category.component';
import { ProductComponent } from '../components/product/product/product.component';
import { ListProductComponent } from '../components/product/list-product.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [
    HomePage,
    BannerComponent,
    MarcasComponent,
    CategoryComponent,
    ProductComponent,
    ListProductComponent
  ]
})
export class HomePageModule { }
