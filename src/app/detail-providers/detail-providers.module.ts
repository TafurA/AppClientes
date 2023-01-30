import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailProvidersPageRoutingModule } from './detail-providers-routing.module';

import { DetailProvidersPage } from './detail-providers.page';
import { HeaderComponent } from '../components/layout/header/header.component';
import { ProductComponent } from '../components/product/product/product.component';
import { ProviderProductComponent } from '../components/product/provider-product.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailProvidersPageRoutingModule
  ],
  declarations: [DetailProvidersPage, HeaderComponent, ProductComponent, ProviderProductComponent]
})
export class DetailProvidersPageModule { }
