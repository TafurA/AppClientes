import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
@Component({
  selector: 'app-category-product',
  templateUrl: './category-product.component.html',
})
export class CategoryProductComponent implements OnInit {
  public categoryId: any;
  public nameCategory: string;
  public arrayDataSubCategory = new Array();
  public loaded = false;
  public productsNull = false;

  constructor(private rutaActiva: ActivatedRoute, public categoryService: CategoryService) { }

  ngOnInit() {
    this.rutaActiva.params.subscribe(
      (params: Params) => {
        this.categoryId = params.idCategory;
        this.nameCategory = params.nameCategory
        this.categoryService.getSubCategoryList(this.categoryId).then(() => {
          this.arrayDataSubCategory = JSON.parse(localStorage.test)
          console.log("this.arrayDataSubCategory")

          if (this.arrayDataSubCategory.length <= 1) {
            this.productsNull = true;
          }

        }).finally(() => {
          if (this.categoryService.isSubCategoryCharged) {
            this.loaded = true
          }
        })
      }
    );
  }

  public slideOpts = {
    slidesPerView: 3,
    autoHeight: true,
    // autoplay: {
    //   delay: 2000
    // },
    preventClicksPropagation: true,
    preventClicks: true,
    preventInteractionOnTransition: true,
    spaceBetween: 16,
    setWrapperSize: true
  }
}
