import { Component, OnInit } from '@angular/core';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { NavController } from '@ionic/angular';
import { GridProductComponent } from '../components/product/grid-product.component';
import { ProductComponent } from '../components/product/product/product.component';
import { LoginService } from '../services/login.service';
import { MarcasService } from '../services/marcas.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.page.html',
  styleUrls: ['./providers.page.scss'],
  providers: [HTTP, MarcasService, GridProductComponent, ProductComponent]
})
export class ProvidersPage implements OnInit {
  public arrayDataMarcas = new Array();

  constructor(public marcasService: MarcasService, public loginService: LoginService, public navControler: NavController) { }

  ngOnInit() {
    this.marcasService.getListMarcas().then(() => {
      this.fillArrayMarcas();
    })
  }

  fillArrayMarcas() {
    this.arrayDataMarcas = this.marcasService.arrayMarcas()
  }

}
