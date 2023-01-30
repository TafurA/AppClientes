import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SidebarMenuPage } from './sidebar-menu.page';

const routes: Routes = [
  {
    path: '',
    component: SidebarMenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SidebarMenuPageRoutingModule {}
