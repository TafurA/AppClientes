import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProvidersPage } from './providers.page';

const routes: Routes = [
  {
    path: '',
    component: ProvidersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProvidersPageRoutingModule {}
