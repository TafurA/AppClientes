import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdatePersonalDataPage } from './update-personal-data.page';

const routes: Routes = [
  {
    path: '',
    component: UpdatePersonalDataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdatePersonalDataPageRoutingModule {}
