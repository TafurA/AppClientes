import { Component, OnInit } from '@angular/core';
import { ModalComponent } from '../components/modal/modal.component';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.page.html',
  providers: [OrderService, ModalComponent]
})

export class OrderHistoryPage implements OnInit {

  public arrayDataOrders = new Array()
  public loaded = false
  modal_id = ""

  constructor(public orderService: OrderService) { }

  ngOnInit() {
    this.getOrdersByClient()
  }

  getOrdersByClient() {
    this.orderService.getOrdersByClient().then(() => {
      this.arrayDataOrders = JSON.parse(localStorage.ordersUser)
    }).finally(() => {
      if (this.orderService.isOrdersCharged) {
        this.loaded = true
      }

      console.log("this.arrayDataOrders")
      console.log(this.arrayDataOrders)
    })
  }

}
