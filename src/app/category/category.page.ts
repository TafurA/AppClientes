import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CategoryComponent } from '../components/category/category.component';
import { GridProductComponent } from '../components/product/grid-product.component';
import { ProductComponent } from '../components/product/product/product.component';
import { CategoryService } from '../services/category.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-category-page',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
  providers: [CategoryService, CategoryComponent, GridProductComponent, ProductComponent]
})
export class CategoryPage implements OnInit {

  constructor(public loginService: LoginService, public navController: NavController) { }

  ngOnInit() {
  }

}
