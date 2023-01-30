import { Injectable } from '@angular/core';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public arrayDataOrders = []
  public arrayCurrentOrderDetial = []
  public arrayProductsCurrentOrderDetail = []

  public isOrdersCharged = false

  constructor(public http: HTTP, public loginService: LoginService) { }

  async getOrdersByClient() {
    await this.http.get(`${environment.url}${environment.apiPath}getPedidosCliente?nitcli=${this.getClientCode()}`, "", environment.headers)
      .then(data => {
        const dataObjTemp = JSON.parse(data.data)

        this.arrayDataOrders = []
        localStorage.removeItem("ordersUser")

        for (const key in dataObjTemp.data) {
          const element = dataObjTemp.data[key];
          const dataSubCategory = {
            orderType: key,
            order: element
          }
          this.arrayDataOrders.push(dataSubCategory)
        }

        localStorage.setItem("ordersUser", JSON.stringify(this.arrayDataOrders))

      }).finally(() => {
        this.isOrdersCharged = true
      })
      .catch(error => {
        console.log("error getPedidosCliente");
        console.log(error);
      });
  }

  async getOrderDetail(orderId) {
    await this.http.get(`${environment.url}${environment.apiPath}getPedidoDetalleCliente?idpedido=${orderId}`, "", environment.headers)
      .then(data => {
        const dataObjTemp = JSON.parse(data.data)

        this.arrayProductsCurrentOrderDetail = []
        localStorage.removeItem("productsCurrentOrderDetail")

        for (const key in dataObjTemp.ordersDetail) {
          const element = dataObjTemp.ordersDetail[key];
          this.arrayProductsCurrentOrderDetail.push(element)
        }

        localStorage.setItem(
          "productsCurrentOrderDetail",
          JSON.stringify(this.arrayProductsCurrentOrderDetail)
        )

      })
      .catch(error => {
        console.log("error getPedidoDetalleCliente");
        console.log(error);

      });
  }

  async getDataUserOrderDetail(orderId) {
    await this.http.get(`${environment.url}${environment.apiPath}getDatosclientePed?idpedido=${orderId}`, "", environment.headers)
      .then(data => {
        const dataObjTemp = JSON.parse(data.data)

        const currentOrderDetail = {
          address: dataObjTemp.data[0].dircli_b,
          status: dataObjTemp.data[0].estped_b,
          date: dataObjTemp.data[0].fecha,
          name: dataObjTemp.data[0].nomcli_b,
          orderId: dataObjTemp.data[0].idpedido,
          phone: dataObjTemp.data[0].telcli_b,
          totalValue: dataObjTemp.data[0].valped_b,
          vendedorEncargado: dataObjTemp.data[0].venped_b,
        };

        this.arrayCurrentOrderDetial.push(currentOrderDetail);

      })
      .catch(error => {
        console.log("error getDatosclientePed");
        console.log(error);
      });
  }

  // async getOrderById(orderId) {
  //   this.arrayCurrentOrderDetial = []
  //   const storageOrders = JSON.parse(localStorage.ordersUser)

  //   for (const key in storageOrders) {
  //     const order = storageOrders[key];

  //     order.order.forEach(orderDetail => {

  //       if (orderDetail.idpedido == orderId) {

  //         const currentOrderDetail = {
  //           address: orderDetail.dircli_b,
  //           status: orderDetail.estped_b,
  //           date: orderDetail.fecha,
  //           name: orderDetail.nomcli_b,
  //           orderId: orderDetail.idpedido,
  //           phone: orderDetail.telcli_b,
  //           totalValue: orderDetail.valped_b,
  //           vendedorEncargado: orderDetail.venped_b,
  //         }

  //         this.arrayCurrentOrderDetial.push(currentOrderDetail)

  //       }

  //     });

  //   }

  //   console.log("NUEVO ORDER DETAIL")
  //   console.log(this.arrayCurrentOrderDetial)
  // }

  private getClientCode() {
    return this.loginService.validateSession()['codcli_b'];
  }
}
