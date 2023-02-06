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

  public productsCurrentOrderDetail = new Array;
  isCashbackProduct: boolean;
  isDiscountProduct: boolean;
  totalProductDiscount: any;
  totalProductValue: number;

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
          this.productsCurrentOrderDetail = []
          // this.productsCurrentOrderDetail = JSON.parse(localStorage.productsCurrentOrderDetail);
          const tem = JSON.parse(localStorage.productsCurrentOrderDetail)

          for (let index = 0; index < tem.length; index++) {
            const element = tem[index];

            this.order.totalProducts = element.length

            element.forEach(product => {
              const temproduct = {
                "img_prod": product.img_prod,
                "nameProduct": product.nameProduct,
                "cantidad": product.cantidad,
                "valor": product.valor,
                "valorUnitario": product.valorUnitario,
                "precioSinDcto": product.precioSinDcto,
                "porcDescuento": product.porcDescuento,
                "isOffert": false,
                "isCashback": false
              }
              temproduct.cantidad = Math.round(temproduct.cantidad)
              this.productWithCashback(temproduct)
              this.productWithDiscount(temproduct)
              this.productsCurrentOrderDetail.push(temproduct)
            });
          };
          console.log("this.productsCurrentOrderDetail")
          console.log(this.productsCurrentOrderDetail)

        });
      }
    );
  }

  public productWithCashback(productObject) {
    if (productObject.valor > "0") {
      productObject.isCashback = true
    }
  }

  public productWithDiscount(productObject) {

    const descuentoFormated = parseInt(productObject.porcDescuento)

    if (descuentoFormated.toFixed(0) > "0") {
      productObject.isOffert = true
    }
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
