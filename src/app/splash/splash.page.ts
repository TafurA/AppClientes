import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  constructor(public nvcControl: NavController,) { }

  ngOnInit() {
    setTimeout(() => {
      document.querySelector("body").classList.add("is-white")
    }, 4000)


    setTimeout(() => {
      this.nvcControl.navigateForward("/tabs/welcome")
      document.querySelector(".img-splash").classList.add("test")
    }, 8000)

  }

}
