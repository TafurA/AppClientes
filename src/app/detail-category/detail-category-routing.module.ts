import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailCategoryPage } from './detail-category.page';

const routes: Routes = [
  {
    path: '',
    component: DetailCategoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailCategoryPageRoutingModule {}
