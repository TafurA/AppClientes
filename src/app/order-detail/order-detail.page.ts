import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HeaderBackComponent } from '../components/layout/header-back/header-back.component';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.page.html',
  providers: [HeaderBackComponent, OrderService]
})

export class OrderDetailPage implements OnInit {

  public order = {
    orderId: "",
    totalValue: 0,
    totalProducts: 0,
    customerName: "",
    address: "",
    phone: "",
    date: "",
    image: ""
  };

  public productsCurrentOrderDetail;

  constructor(public rutaActiva: ActivatedRoute, public orderService: OrderService) { }

  ngOnInit() {

    this.getOrderDetail().then(() => {
      console.log("ANTES DE ENTRAR AL SERVICE")
      console.log(this.order.orderId)
      this.orderService.getDataUserOrderDetail(this.order.orderId).finally(() => {
        this.order.orderId = this.orderService.arrayCurrentOrderDetial[0].orderId;
        this.order.totalValue = this.orderService.arrayCurrentOrderDetial[0].totalValue;
        this.order.customerName = this.orderService.arrayCurrentOrderDetial[0].name;
        this.order.address = this.orderService.arrayCurrentOrderDetial[0].address;
        this.order.phone = this.orderService.arrayCurrentOrderDetial[0].phone;
        this.order.date = this.orderService.arrayCurrentOrderDetial[0].date;
        this.order.image = this.orderService.arrayCurrentOrderDetial[0].img_prod;
      });
    });
  }

  public async getOrderDetail() {
    console.log("el puto param")
    await this.rutaActiva.params.subscribe(
      (params: Params) => {
        console.log(params)
        this.order.orderId = params.idPedido;
        this.orderService.getOrderDetail(this.order.orderId).finally(() => {
          this.productsCurrentOrderDetail = JSON.parse(localStorage.productsCurrentOrderDetail);

          for (let index = 0; index < this.productsCurrentOrderDetail.length; index++) {
            const element = this.productsCurrentOrderDetail[index];

            this.order.totalProducts = element.length

            element.forEach(product => {
              product.cantidad = Math.round(product.cantidad)
            });
          };

        });
      }
    );
  }

  toggleDropdown(e) {
    e.target.closest(
      '.o-checkout__dropdown'
    ).classList.toggle('is-dropdown-show');
  }

  toggleDropdownProduct(e) {
    e.target.closest(
      '.c-status'
    ).classList.toggle('is-dropdown-show');
  }

}
