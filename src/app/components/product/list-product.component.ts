import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
})
export class ListProductComponent implements AfterViewInit {

  public arrayDataProducts = new Array();

  public loaded = false;

  constructor(public productService: ProductService, public loginService: LoginService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    console.log("aqui no hace ni chimba")
    this.getProducts()
  }

  public slideOpts = {
    slidesPerView: "auto",
    autoHeight: true,
    preventClicksPropagation: true,
    preventClicks: true,
    preventInteractionOnTransition: true,
    spaceBetween: 16,
    setWrapperSize: true
  }

  public async getProducts() {
    await this.productService.getCurrentProducts().then(() => {
      if (this.productService.isproductsCharged) {
        this.loaded = true
      }
    }).finally(() => {
      this.arrayDataProducts = this.productService.arrayDataProducts
    })
  }

  async fillArrayProducts() {
    this.arrayDataProducts = this.productService.arrayDataProducts
  }

}
