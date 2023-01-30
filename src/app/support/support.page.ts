import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-support',
})

export class SupportPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  toggleDropdown(e) {
    e.target.closest(
      ".js-dropdown"
    ).classList.toggle("is-dropdown-show")
  }

}
