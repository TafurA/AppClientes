import { Component, OnInit } from '@angular/core';
import { SupportPage } from '../support.page';

@Component({
  selector: 'app-cashback',
  templateUrl: './cashback.page.html',
  providers: [SupportPage]
})
export class CashbackPage implements OnInit {

  constructor(public supportPage: SupportPage) { }

  ngOnInit() {
  }

  public toggleDropdown(e) {
    this.supportPage.toggleDropdown(e)
  }

}
