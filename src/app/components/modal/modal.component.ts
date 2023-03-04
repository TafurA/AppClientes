import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { SwiperModule, SwiperComponent } from 'swiper/angular';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
// import Swiper core and required modules
import { SwiperOptions, Swiper, Virtual } from 'swiper';
import { OrderService } from 'src/app/services/order.service';
import { IonModal } from '@ionic/angular';
// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
SwiperCore.use([Virtual]);

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  imports: [SwiperModule],
  providers: [SwiperModule]
})
export class ModalComponent implements OnInit {

  @ViewChild(IonModal) modal: IonModal;
  @Input() modalid: string;
  @Input() idFactura: string;
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;

  isHideButtonEntregado = true
  isHideButtonObservacion = true
  isHideButtonEnviado = true
  isModalOpen = false;
  sendFormSuccesfull = false

  public entregado = ""
  public observacion = ""
  public msgButton = "Enviar sin observación"

  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 50,
    pagination: {
      dynamicBullets: true,
      clickable: true
    },
  };

  constructor(private orderService: OrderService) {
  }

  ngOnInit() { }

  setOpen() {
    this.modal.dismiss(null, "cancel")
  }

  slideNext() {
    this.swiper.swiperRef.slideNext(100);
  }

  changeStateButtonSuccess() {
    if (this.entregado != " ") {
      this.isHideButtonEntregado = false
    }
  }

  changeStateButtonObservation() {
    if (this.observacion.length > 3) {
      this.isHideButtonObservacion = false
      this.msgButton = "Enviar"
    }
  }

  onSlideChange() {
    switch (this.swiper.swiperRef.activeIndex) {
      case 1:
        document.querySelector(".is-observation").classList.remove("test")
        break;

      case 2:
        document.querySelector(".is-observation").classList.add("test")
        break;

      default:
        break;
    }
  }

  returnObservationEncode() {
    return window.btoa(unescape(encodeURIComponent(JSON.stringify(this.observacion))))
  }

  sendObservation() {
    this.orderService.sendSatisfiedForm(
      this.idFactura,
      this.entregado,
      this.returnObservationEncode()
    )
      .then(() => {
        this.slideNext()
      }).finally(() => {
        this.isHideButtonEnviado = false
        this.sendFormSuccesfull = true
      })
  }

}
