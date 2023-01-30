import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarDetailPageRoutingModule } from './car-detail-routing.module';

import { CarDetailPage } from './car-detail.page';
import { HeaderBackComponent } from '../components/layout/header-back/header-back.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarDetailPageRoutingModule
  ],
  declarations: [CarDetailPage, HeaderBackComponent]
})
export class CarDetailPageModule { }
