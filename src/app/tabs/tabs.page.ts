import { Component } from '@angular/core';
import { HeaderComponent } from '../components/layout/header/header.component';
import { BannerComponent } from '../components/banner/banner.component';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  providers: [HeaderComponent, BannerComponent]
})
export class TabsPage {
  constructor() { }
}
