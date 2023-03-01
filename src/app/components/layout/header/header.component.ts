import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { Subject } from 'rxjs';

import { LoginService } from 'src/app/services/login.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
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
    public nvCtrl: NavController,
    public loginService: LoginService,
    public loadingController: LoadingController,
    public productService: ProductService,
    public navController: NavController
  ) { }

  ngOnInit() {
    this.getCounterCarProducts()
    this.filterList();
    this.hideSearchAnyClickDos()

    this.listFiltered = this.nameProducts
  }

  filterList(): void {
    this.productService.getProductsSearch().then(() => {
      this.arraySearchProducts = this.productService.arrayDataProductSearch
    }).finally(() => {
      this.arraySearchProducts.forEach(product => {
        const data = {
          keyWord: product.palabrasClaves,
          word: product.nameProduct,
          img_prod: product.img_prod
        }
        this.nameProducts.push(data)
      });

      this.searchTerm$.subscribe(term => {

        if (term.length >= 1) {
          document.querySelectorAll(".c-list-search-box").forEach(element => {
            element.classList.add("is-search-type")
          });
        } else if (term.length == 0) {
          document.querySelectorAll(".c-list-search-box").forEach(element => {
            element.classList.remove("is-search-type")
          });
        }

        let newListProducts = []
        this.nameProducts.forEach(element => {
          if (element.word != null && element.keyWord != null) {
            newListProducts.push(element)
          }
        });

        this.listFiltered = newListProducts
          .filter(item => item.keyWord.toLowerCase().indexOf(term.toLowerCase()) >= 0);

      });
    })

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

        if (element.nameProduct.trim() == e.target.textContent.trim()) {
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
      translucent: false,
      cssClass: 'o-loader'
    });
    await this.loader.present();
  }

  async removeLoader() {
    this.loader = await this.loadingController.dismiss();
  }

}
