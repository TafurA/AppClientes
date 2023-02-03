import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateCredentialsPage } from './update-credentials.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateCredentialsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateCredentialsPageRoutingModule {}
