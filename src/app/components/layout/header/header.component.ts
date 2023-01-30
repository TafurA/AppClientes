import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
// import { SearchService } from 'src/app/service/search/search.service';
// import { ShopingCarService } from 'src/app/service/shoping-car.service';
// import { GridProductComponent } from '../../product/grid-product.component';

import { Subject } from 'rxjs';

// import { ProductService } from 'src/app/service/product/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  // providers: [GridProductComponent]
})
export class HeaderComponent implements OnInit {

  public numberProductsCar;
  public productsIsNull = true;

  public loader;
  arraySearchProducts = new Array()
  nameProducts = []
  searchTerm$ = new Subject<string>();
  listFiltered = [];

  constructor(
    // public shopinCarService: ShopingCarService,
    public nvCtrl: NavController,
    // public searchService: SearchService,
    public loadingController: LoadingController,
    // public grid: GridProductComponent,
    // public productService: ProductService
  ) { }

  ngOnInit() {
    console.log("lo hace")
    this.getCounterCarProducts()
    this.filterList();
    this.hideSearchAnyClickDos()

    this.listFiltered = this.nameProducts
  }

  filterList(): void {
    // this.productService.getProductsSearch().then(() => {
    //   this.arraySearchProducts = this.productService.arrayDataProductSearch
    // }).finally(() => {
    //   this.arraySearchProducts.forEach(product => {
    //     this.nameProducts.push(product.nameProduct)
    //   });

    //   this.searchTerm$.subscribe(term => {

    //     if (term.length >= 2) {
    //       document.querySelectorAll(".c-list-search-box").forEach(element => {
    //         element.classList.add("is-search-type")
    //       });
    //     } else if (term.length == 0) {
    //       document.querySelectorAll(".c-list-search-box").forEach(element => {
    //         element.classList.remove("is-search-type")
    //       });
    //     }

    //     let newListProducts = []
    //     this.nameProducts.forEach(element => {
    //       if (element != null) {
    //         newListProducts.push(element)
    //       }
    //     });

    //     this.listFiltered = newListProducts
    //       .filter(item => item.toLowerCase().indexOf(term.toLowerCase()) >= 0);
    //   });
    // })

  }

  hideSearchAnyClickDos() {
    const search = document.querySelector('.js-input-search');

    search.addEventListener('blur', (event) => {
      document.querySelector(".c-list-search-box").classList.remove("is-search-type")
    });

  }

  public getUrlProduct(e) {
    this.arraySearchProducts.forEach(element => {
      if (element.nameProduct != null) {
        if (element.nameProduct.trim() == e.target.innerHTML.trim()) {
          this.nvCtrl.navigateForward(`/tabs/detail-product/${element.codeProduct}`).then(() => {
            document.querySelector(".c-list-search-box").classList.remove("is-search-type")
          })
        }
      }
    });
  }

  public getCounterCarProducts() {
    const counterLocalStorage = localStorage.productsCar
    if (counterLocalStorage) {
      this.numberProductsCar = JSON.parse(counterLocalStorage).length
      this.productsIsNull = !this.productsIsNull
    } else {
      this.numberProductsCar = 0
      this.productsIsNull = this.productsIsNull
    }
  }

  public hideSearch() {
    if (window.location.pathname.includes("search")) {
      return true
    }
  }

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
