import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupportPage } from './support.page';

const routes: Routes = [
  {
    path: '',
    component: SupportPage
  },
  {
    path: 'journal',
    loadChildren: () => import('./journal/journal.module').then(m => m.JournalPageModule)
  },
  {
    path: 'cashback',
    loadChildren: () => import('./cashback/cashback.module').then(m => m.CashbackPageModule)
  },
  {
    path: 'question',
    loadChildren: () => import('./question/question.module').then(m => m.QuestionPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupportPageRoutingModule { }
