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

  constructor(private rutaActiva: ActivatedRoute, public categoryService: CategoryService) { }

  ngOnInit() {
    this.rutaActiva.params.subscribe(
      (params: Params) => {
        this.categoryId = params.idCategory;
        this.nameCategory = params.nameCategory
        this.categoryService.getSubCategoryList(this.categoryId).then(() => {
          this.arrayDataSubCategory = JSON.parse(localStorage.test)
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
