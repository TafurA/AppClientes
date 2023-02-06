import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.page.html',
  providers: [OrderService]
})

export class OrderHistoryPage implements OnInit {

  public arrayDataOrders = new Array()
  public loaded = false

  constructor(public orderService: OrderService) { }

  ngOnInit() {
    this.getOrdersByClient()
  }

  getOrdersByClient() {
    this.orderService.getOrdersByClient().then(() => {
      this.arrayDataOrders = JSON.parse(localStorage.ordersUser)
      console.log("this")
      console.log(this.arrayDataOrders)
    }).finally(() => {
      if (this.orderService.isOrdersCharged) {
        this.loaded = true
      }
    })
  }

}
