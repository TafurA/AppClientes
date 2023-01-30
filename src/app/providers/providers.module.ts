import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProvidersPageRoutingModule } from './providers-routing.module';

import { ProvidersPage } from './providers.page';
import { GridProductComponent } from '../components/product/grid-product.component';
import { ProductComponent } from '../components/product/product/product.component';
import { HeaderComponent } from '../components/layout/header/header.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProvidersPageRoutingModule,
    NgxPaginationModule
  ],
  declarations: [ProvidersPage, HeaderComponent, GridProductComponent, ProductComponent]
})
export class ProvidersPageModule { }
