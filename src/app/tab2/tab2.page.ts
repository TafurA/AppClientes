import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  profileId: string;
  datosId = [];

  constructor(
    private activatedRoute: ActivatedRoute
  ) {}


  ngOnInit(){
    this.profileId = this.activatedRoute.snapshot.paramMap.get('codigo')
    axios.get("https://rickandmortyapi.com/api/character/" + this.profileId, {})
      .then(response => {
        this.datosId = response.data.results;
        console.log(response)
      })
  }

  /*async getSubCategory() {
    try {
      const respues = axios.post("IntranetSurti/WebServicesSurtiAppRest/getSubCategory", {}, this.config)
      .then(response => {
        console.log(response)
        this.datos = response.data.data;
      })
    } catch (error) {
      console.log(error.status);
      console.log(error.error); // error message as string
      console.log(error.headers);
    }
  }*/
}
