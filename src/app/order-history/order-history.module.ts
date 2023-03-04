import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderHistoryPageRoutingModule } from './order-history-routing.module';

import { OrderHistoryPage } from './order-history.page';
import { HeaderBackComponent } from '../components/layout/header-back/header-back.component';
import { ModalComponent } from '../components/modal/modal.component';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderHistoryPageRoutingModule,
    SwiperModule
  ],
  declarations: [OrderHistoryPage, HeaderBackComponent, ModalComponent],
})
export class OrderHistoryPageModule { }
