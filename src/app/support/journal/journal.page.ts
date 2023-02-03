import { Component, OnInit } from '@angular/core';
import { SupportPage } from '../support.page';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.page.html',
  providers: [SupportPage]
})
export class JournalPage implements OnInit {

  constructor(public supportPage: SupportPage) { }

  ngOnInit() {
  }

  public toggleDropdown(e) {
    this.supportPage.toggleDropdown(e)
  }
  public download(url){
    window.open(url, "_blank");
  }
}
