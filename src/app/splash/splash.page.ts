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
      this.nvcControl.navigateForward("/tabs/welcome")
    }, 8000)

  }

}
