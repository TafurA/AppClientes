import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdatedPasswordPage } from './updated-password.page';

const routes: Routes = [
  {
    path: '',
    component: UpdatedPasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdatedPasswordPageRoutingModule {}
