import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdatedPasswordPageRoutingModule } from './updated-password-routing.module';

import { UpdatedPasswordPage } from './updated-password.page';
import { HeaderBackComponent } from '../components/layout/header-back/header-back.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    UpdatedPasswordPageRoutingModule
  ],
  declarations: [UpdatedPasswordPage, HeaderBackComponent]
})
export class UpdatedPasswordPageModule { }
