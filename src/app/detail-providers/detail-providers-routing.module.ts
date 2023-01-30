import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailProvidersPage } from './detail-providers.page';

const routes: Routes = [
  {
    path: '',
    component: DetailProvidersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailProvidersPageRoutingModule {}
