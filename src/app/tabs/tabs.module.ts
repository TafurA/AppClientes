import { IonicModule } from '@ionic/angular';
import { ChangeDetectorRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { HeaderComponent } from '../components/layout/header/header.component';
import { RouterModule } from '@angular/router';
import { SessionGuard } from '../guard/session.guard';
import { BannerComponent } from '../components/banner/banner.component';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { BannerService } from '../services/banner.service';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    RouterModule
  ],
  declarations: [TabsPage, HeaderComponent, BannerComponent],
  providers: [HTTP, BannerService, BannerComponent]
})
export class TabsPageModule { }
