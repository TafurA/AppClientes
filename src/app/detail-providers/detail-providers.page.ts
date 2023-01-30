import { Component, OnInit } from '@angular/core';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { HeaderComponent } from '../components/layout/header/header.component';
import { MarcasComponent } from '../components/marcas/marcas.component';
import { MarcasService } from '../services/marcas.service';

@Component({
  selector: 'app-detail-providers',
  templateUrl: './detail-providers.page.html',
  styleUrls: ['./detail-providers.page.scss'],
  providers: [HTTP, MarcasService, MarcasComponent, HeaderComponent]
})
export class DetailProvidersPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
