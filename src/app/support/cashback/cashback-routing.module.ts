import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CashbackPage } from './cashback.page';

const routes: Routes = [
  {
    path: '',
    component: CashbackPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CashbackPageRoutingModule {}
