import { Component, OnInit } from '@angular/core';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { NavController } from '@ionic/angular';
import { HeaderComponent } from '../components/layout/header/header.component';
import { MarcasComponent } from '../components/marcas/marcas.component';
import { LoginService } from '../services/login.service';
import { MarcasService } from '../services/marcas.service';

@Component({
  selector: 'app-detail-providers',
  templateUrl: './detail-providers.page.html',
  styleUrls: ['./detail-providers.page.scss'],
  providers: [HTTP, MarcasService, MarcasComponent, HeaderComponent]
})
export class DetailProvidersPage implements OnInit {

  constructor(public loginService: LoginService, public navController: NavController) { }

  ngOnInit() {

  }

}
