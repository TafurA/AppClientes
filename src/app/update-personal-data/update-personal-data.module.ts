import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdatePersonalDataPageRoutingModule } from './update-personal-data-routing.module';

import { UpdatePersonalDataPage } from './update-personal-data.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    UpdatePersonalDataPageRoutingModule
  ],
  declarations: [UpdatePersonalDataPage]
})
export class UpdatePersonalDataPageModule {}
