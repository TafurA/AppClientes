import { Component, OnInit } from '@angular/core';
import { SupportPage } from '../support.page';
import { SupportService } from '../../services/support.service';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
@Component({
  selector: 'app-cashback',
  templateUrl: './cashback.page.html',
  providers: [SupportPage,HTTP,SupportService]
})
export class CashbackPage implements OnInit {
  public supportChasback:any;
  constructor(public supportPage: SupportPage,
              private supportService: SupportService) { }

  ngOnInit() {
    this.support();
  }

  public toggleDropdown(e) {
    this.supportPage.toggleDropdown(e)
  }
    // data soporte
    public async support(){
      await this.supportService.supportCashback().then(() => {
        if (this.supportService.supportCash()[0]) {
          this.supportChasback =this.supportService.supportCash();
          console.log("this.supportChasback");
          console.log(this.supportChasback);
        }else{
          console.log("error");
        }
      });
    }
    // tratamiento de datos personales
    public download(url){
      window.open(url, "_blank");
    }

}
