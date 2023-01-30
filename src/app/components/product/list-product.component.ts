import { Component, OnInit } from '@angular/core';

import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
})
export class ListProductComponent implements OnInit {

  public arrayDataProducts = new Array();

  public loaded = false;

  constructor(public productService: ProductService) { }

  ngOnInit() {
    this.getProducts()
  }

  ngAfterViewInit() {
    this.fillArrayProducts();
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

  public getProducts() {
    this.productService.getCurrentProducts().finally(() => {
      if (this.productService.isproductsCharged) {
        this.loaded = true
      }
    })
  }

  async fillArrayProducts() {
    this.arrayDataProducts = this.productService.arrayDataProducts
  }

}
