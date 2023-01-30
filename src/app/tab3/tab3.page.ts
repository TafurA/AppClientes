import { Component } from '@angular/core';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  providers: [HTTP, LoginService]
})
export class Tab3Page {

  constructor(private http: HTTP, private loginService: LoginService) {
    // this.loginService.test()
  }

}
