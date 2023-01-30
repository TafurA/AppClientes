import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SidebarMenuPageRoutingModule } from './sidebar-menu-routing.module';

import { SidebarMenuPage } from './sidebar-menu.page';
import { MenuFixedComponent } from '../components/layout/menu-fixed/menu-fixed.component';
import { BannerComponent } from '../components/banner/banner.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SidebarMenuPageRoutingModule
  ],
  declarations: [SidebarMenuPage, BannerComponent]
})
export class SidebarMenuPageModule {}
