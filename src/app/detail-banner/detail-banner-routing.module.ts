import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailBannerPage } from './detail-banner.page';

const routes: Routes = [
  {
    path: '',
    component: DetailBannerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailBannerPageRoutingModule {}
