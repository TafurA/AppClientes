import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PollPageRoutingModule } from './poll-routing.module';
import { PollPage } from './poll.page';

import { Routes, RouterModule } from '@angular/router';
import { HeaderBackComponent } from '../components/layout/header-back/header-back.component';

const routes: Routes = [
  {
    path: '',
    component: PollPage
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    IonicModule,
    PollPageRoutingModule
  ],
  declarations: [PollPage, HeaderBackComponent]
})
export class PollPageModule {}
