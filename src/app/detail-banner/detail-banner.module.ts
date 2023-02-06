import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailBannerPageRoutingModule } from './detail-banner-routing.module';

import { DetailBannerPage } from './detail-banner.page';
import { HeaderComponent } from '../components/layout/header/header.component';
import { BannerProductComponent } from '../components/product/banner-product.component';
import { ProductComponent } from '../components/product/product/product.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailBannerPageRoutingModule,
    NgxPaginationModule
  ],
  declarations: [DetailBannerPage, BannerProductComponent, ProductComponent]
})
export class DetailBannerPageModule { }
