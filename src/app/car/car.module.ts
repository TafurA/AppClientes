import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarPageRoutingModule } from './car-routing.module';

import { CarPage } from './car.page';
import { HeaderBackComponent } from '../components/layout/header-back/header-back.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarPageRoutingModule
  ],
  declarations: [CarPage, HeaderBackComponent]
})
export class CarPageModule { }
