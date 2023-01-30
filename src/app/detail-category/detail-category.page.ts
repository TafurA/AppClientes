import { Component, OnInit } from '@angular/core';
import { CategoryComponent } from '../components/category/category.component';
import { HeaderComponent } from '../components/layout/header/header.component';
import { CategoryProductComponent } from '../components/product/category-product.component';
import { ProductComponent } from '../components/product/product/product.component';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-detail-category',
  templateUrl: './detail-category.page.html',
  styleUrls: ['./detail-category.page.scss'],
  providers: [HeaderComponent, CategoryService, CategoryComponent, CategoryProductComponent, ProductComponent]
})
export class DetailCategoryPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
