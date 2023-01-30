import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuestionPageRoutingModule } from './question-routing.module';

import { QuestionPage } from './question.page';
import { HeaderBackComponent } from 'src/app/components/layout/header-back/header-back.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuestionPageRoutingModule
  ],
  declarations: [QuestionPage, HeaderBackComponent]
})
export class QuestionPageModule { }
