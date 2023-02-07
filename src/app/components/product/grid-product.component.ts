import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

import { FavoriteService } from 'src/app/services/favorite.service';
import { ProductService } from 'src/app/services/product.service';

// import { SearchService } from 'src/app/service/search/search.service';

ProductService
@Component({
  selector: 'app-grid-product',
  templateUrl: './grid-product.component.html',
})
export class GridProductComponent implements OnInit {

  public arrayDataProducts = new Array();
  public searchProducts = new Array();
  public isFavoriteNull;
  public isSearchProductsNull;
  public isViewOfFavorite = false;

  public loaded = false
  public loader;

  constructor(
    public productService: ProductService,
    public favoriteService: FavoriteService,
    // public searchService: SearchService,
    public loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.getProducts()
  }

  public getProducts() {
    // For list of favorite products
    if (window.location.pathname.includes("favorite")) {
      if (localStorage.getItem("userSessionData")) {
        this.isViewOfFavorite = true;
        this.isFavoriteNull = this.favoriteService.getIsFavoriteNull();

        this.favoriteService.getFavoriteProductsList().then(() => {
          this.fillArrayProducts()
        }).finally(() => {
          if (this.productService.isproductsCharged) {
            this.loaded = true
          }
        })
      }
    } else if (window.location.pathname.includes("/offert")) {
      this.productService.getOffertProducts().then(() => {
        this.fillArrayProducts()
      }).finally(() => {
        if (this.productService.isproductsCharged) {
          this.loaded = true
        }
      })
    }
    else {
      // Products without User session
      this.productService.getCurrentProducts().then(() => {
        this.fillArrayProducts()
      }).finally(() => {
        if (this.productService.isproductsCharged) {
          this.loaded = true
        }
      })
    }
  }

  fillArrayProducts() {
    // For list of favorite products
    if (window.location.pathname.includes("favorite")) {
      // setInterval(() => {
      this.arrayDataProducts = this.favoriteService.arrayDataFavorites
      this.isFavoriteNull = this.favoriteService.getIsFavoriteNull();
      // }, 1000)
    }
    else {
      // List of General products
      this.arrayDataProducts = this.productService.arrayDataProducts
      this.isSearchProductsNull = true
    }
  }

  // public changeSearchProducts() {
  //   const form = document.querySelector(".js-search-header");

  //   this.searchService.getProductsOfSearch(
  //     form.querySelector("input").value.toLowerCase()
  //   ).then(() => {
  //     this.arrayDataProducts = JSON.parse(window.localStorage.getItem("productsSearch"))
  //   }).finally(() => {
  //     if (this.arrayDataProducts.length > 0) {
  //       this.isSearchProductsNull = true
  //     } else {
  //       this.isSearchProductsNull = false
  //     }
  //   })

  // }

  async showLoader() {
    this.loader = await this.loadingController.create({
      spinner: "bubbles",
      translucent: true,
      cssClass: 'o-loader'
    });
    await this.loader.present();
  }

  async removeLoader() {
    this.loader = await this.loadingController.dismiss();
  }
}

