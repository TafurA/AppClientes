import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OffertPage } from './offert.page';

const routes: Routes = [
  {
    path: '',
    component: OffertPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OffertPageRoutingModule {}
