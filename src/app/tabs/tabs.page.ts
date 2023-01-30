import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  // @ViewChild('myTabs') tabs: IonTabs;

  // toggleLayout() {
  //   setTimeout(() => {
  //     console.log("this.tabs.getSelected()");
  //     console.log(this.tabs.getSelected());
  //     if (this.tabs.getSelected().includes("sidebar-menu")) {
  //       console.log("AQUIE ESTA EN EL MENU")
  //       document.querySelector("app-header").classList.add("test")
  //       document.querySelector("ion-tab-bar").classList.remove("test")
  //     }
  //     else if (
  //       this.tabs.getSelected().includes("splash") &&
  //       this.tabs.getSelected().includes("welcome") &&
  //       this.tabs.getSelected().includes("profile") &&
  //       this.tabs.getSelected().includes("order-detail") &&
  //       this.tabs.getSelected().includes("order-history") &&
  //       this.tabs.getSelected().includes("favorite") &&
  //       this.tabs.getSelected().includes("car") &&
  //       this.tabs.getSelected().includes("providers") &&
  //       this.tabs.getSelected().includes("detail-providers") &&
  //       this.tabs.getSelected().includes("category") &&
  //       this.tabs.getSelected().includes("detail-category")
  //     ) {
  //       document.querySelector("app-header").classList.add("test")
  //       document.querySelector("ion-tab-bar").classList.add("test")
  //     } else {
  //       document.querySelector("app-header").classList.remove("test")
  //       document.querySelector("ion-tab-bar").classList.remove("test")
  //     }
  //   }, 500)
  // }

}
