import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { HeaderBackComponent } from '../components/layout/header-back/header-back.component';
import { LoginService } from '../services/login.service';
import { OrderService } from '../services/order.service';
import { ShopingCarService } from '../services/shoping-car.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.page.html',
  providers: [HeaderBackComponent, OrderService]
})
export class CarDetailPage implements OnInit {

  public addressData = {
    userCurrent: "",
    address: "",
    phone: "",
    date: new Date()
  }

  public formatDate;

  public detailData = {
    cashback: "",
    productsLength: 0,
    subtotal: "",
    total: ""
  }

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

  public totalPriceFormated: any = 0

  public groupAddres = true;
  public groupPago = false;
  public groupConfirm = false;
  productsCurrentOrderDetail: any;

  public loader: any;

  constructor(
    public loginService: LoginService,
    public shopingService: ShopingCarService,
    public orderService: OrderService,
    public loadingController: LoadingController,
    public navController: NavController
  ) { }

  ngOnInit() {
    this.addressData.userCurrent = this.loginService.validateSession()['nomcli_b'] + " " + this.loginService.validateSession()['ape1cli_b']

    if (localStorage.getItem("AddressList") != "default") {
      // this.addressData.address = "AJAJ sisi"
      this.validateCurrentAddress()
    } else {
      this.addressData.address = this.loginService.validateSession()['dircli_b']
      this.addressData.phone = this.loginService.validateSession()['telcli_b']
    }

    this.getOrderDeliveryDate()

    this.getOrderDetail()
  }

  public validateCurrentAddress() {
    const dataList = JSON.parse(localStorage.getItem("AddressList"))
    const listAddress = dataList
    listAddress.forEach(element => {
      if (element.codcli_b == localStorage.getItem("codeUserAddress")) {
        this.addressData.address = element.dircli_b
        this.addressData.phone = element.telcli_b
      }
    });
  }

  public getOrderDeliveryDate() {
    this.addressData.date.setDate(this.addressData.date.getDate() + 1)
    const formatDate = this.addressData.date.toLocaleDateString(
      'es-es', { weekday: "long", month: "long", day: "numeric" })

    this.formatDate = formatDate

    return formatDate
  }

  public getOrderDetail() {
    const orderDetailTemp = JSON.parse(localStorage.getItem("orderDetail"))
    this.detailData.cashback = orderDetailTemp.cashback
    this.detailData.subtotal = orderDetailTemp.subtotal
    this.detailData.total = orderDetailTemp.total
    this.detailData.productsLength = orderDetailTemp.productsLength

    if (this.detailData.subtotal == "0") {
      this.detailData.subtotal = this.detailData.total
    }
  }

  public showPaymentStep() {

    this.navController.navigateForward("/tabs/poll").then(() => {
      this.groupAddres = false;
      this.groupPago = true

      const step = document.querySelector(".c-steps")
      const childrenStep = step.querySelector(".is-current")

      if (childrenStep) {
        childrenStep.classList.remove("is-current")
        childrenStep.classList.add("is-checked")

        childrenStep.nextElementSibling.classList.add("is-current")
        console.log("YA CUANDO LLEGUES DEBE CAMBIAR")
      }
    })
  }

  public showConfirmOrder() {
    this.groupPago = false
    this.groupConfirm = true

    const step = document.querySelector(".c-steps")
    const childrenStep = step.querySelector(".is-current")

    if (childrenStep) {
      childrenStep.classList.remove("is-current")
      childrenStep.classList.add("is-checked")
    }

    setTimeout(() => {
      this.shopingService.dropCar()
    }, 1000)
  }

  public sendOrder() {
    this.showLoader();

    this.shopingService.sendOrder().then(() => {
      this.getConfirmOrderDetail();
      this.getConfirmProductsOrderDetail();
    }).finally(() => {
      console.log('TERMINADO');
      console.log(this.order);
      this.showConfirmOrder();
      this.removeLoader();
    });
  }

  public getConfirmOrderDetail() {
    this.orderService.getDataUserOrderDetail(this.shopingService.idOrderCurrent).finally(() => {
      this.order.orderId = this.orderService.arrayCurrentOrderDetial[0].orderId;
      this.order.totalValue = this.orderService.arrayCurrentOrderDetial[0].totalValue;
      this.order.customerName = this.orderService.arrayCurrentOrderDetial[0].name;
      this.order.address = this.orderService.arrayCurrentOrderDetial[0].address;
      this.order.phone = this.orderService.arrayCurrentOrderDetial[0].phone;
      this.order.date = this.orderService.arrayCurrentOrderDetial[0].date;
      this.order.image = this.orderService.arrayCurrentOrderDetial[0].img_prod;
    });
  }

  public getConfirmProductsOrderDetail() {
    this.orderService.getOrderDetail(this.shopingService.idOrderCurrent).finally(() => {
      this.productsCurrentOrderDetail = JSON.parse(localStorage.productsCurrentOrderDetail);
      for (let index = 0; index < this.productsCurrentOrderDetail.length; index++) {
        const element = this.productsCurrentOrderDetail[index];
        this.order.totalProducts = element.length
      }
    });
  }

  toggleDropdownProduct(e) {
    e.target.closest(
      ".c-status"
    ).classList.toggle("is-dropdown-show")
  }

  async showLoader() {
    this.loader = await this.loadingController.create({
      spinner: "bubbles",
      translucent: true,
      cssClass: 'o-loader'
    });
    await this.loader.present();
  }

  async removeLoader() {
    this.loader = await this.loadingController.dismiss();
  }


}
