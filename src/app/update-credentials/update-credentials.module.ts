import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateCredentialsPageRoutingModule } from './update-credentials-routing.module';
import { HeaderBackComponent } from '../components/layout/header-back/header-back.component';
import { UpdateCredentialsPage } from './update-credentials.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    HeaderBackComponent,
    UpdateCredentialsPageRoutingModule
  ],
  declarations: [UpdateCredentialsPage,HeaderBackComponent]
})
export class UpdateCredentialsPageModule {}
