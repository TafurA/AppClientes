import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MarcasService } from 'src/app/services/marcas.service';
@Component({
  selector: 'app-provider-product',
  templateUrl: './provider-product.component.html',
})
export class ProviderProductComponent implements OnInit {
  public providerId: any;
  public providerImage: any;
  public providerName: any;
  public detailProvider: string;
  public arrayDataDetailProvider = new Array();
  public isProductsNull;

  constructor(private rutaActiva: ActivatedRoute, public providerService: MarcasService) { }

  ngOnInit() {
    this.rutaActiva.params.subscribe(
      (params: Params) => {
        this.providerId = params.idProvider;
        this.providerImage = params.imgProvider;
        this.providerName = params.nameProvider;
        this.detailProvider = params.nameCategory
        this.providerService.getProviderDetail(this.providerId).then(() => {
          this.arrayDataDetailProvider = JSON.parse(localStorage.providersDetail)
        }).finally(() => {
          this.isProductsNull = this.providerService.getIsProductsNull();
        })
      }
    );
  }

  public slideOpts = {
    slidesPerView: 3,
    autoHeight: true,
    // autoplay: {
    //   delay: 2000
    // },
    preventClicksPropagation: true,
    preventClicks: true,
    preventInteractionOnTransition: true,
    spaceBetween: 16,
    setWrapperSize: true
  }

}
