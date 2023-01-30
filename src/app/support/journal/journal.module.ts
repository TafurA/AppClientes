import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JournalPageRoutingModule } from './journal-routing.module';

import { JournalPage } from './journal.page';
import { HeaderBackComponent } from 'src/app/components/layout/header-back/header-back.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JournalPageRoutingModule
  ],
  declarations: [JournalPage, HeaderBackComponent]
})
export class JournalPageModule { }
