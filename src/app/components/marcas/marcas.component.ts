import { Component, OnInit } from '@angular/core';

import { MarcasService } from 'src/app/services/marcas.service';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
})

export class MarcasComponent implements OnInit {

  public arrayDataMarcas = new Array();

  public optionsSlider = {
    slidesPerView: "auto",
    spaceBetween: 16
  }

  constructor(public marcasService: MarcasService) { }

  ngOnInit(): void {
    this.marcasService.getListMarcas();
  }

  ngAfterViewInit() {
    this.fillArrayMarcas();
  }

  fillArrayMarcas() {
    this.arrayDataMarcas = this.marcasService.arrayMarcas()
  }
}
