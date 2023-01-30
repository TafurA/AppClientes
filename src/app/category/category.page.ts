import { Component, OnInit } from '@angular/core';
import { CategoryComponent } from '../components/category/category.component';
import { GridProductComponent } from '../components/product/grid-product.component';
import { ProductComponent } from '../components/product/product/product.component';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-category-page',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
  providers: [CategoryService, CategoryComponent, GridProductComponent, ProductComponent]
})
export class CategoryPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
