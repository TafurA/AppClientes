import { Component } from '@angular/core';
import axios from 'axios';
import { LoginService } from '../services/login.service';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  providers: [HTTP, LoginService]
})
export class Tab1Page {


  datos = [];

  constructor(private http: HTTP, private loginService: LoginService) {
    // this.loginService.test()
    this.getUsers()
  }

  config = {
    headers: {
      'Authorization': 'Basic U3VydGlBcHA6MzFhNWE1YjAxNDBlMDEzN2UwOGFhZGFhNjBlYjAxNmE0YjQzNDgxMg==',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Headers': "Origin, X-Requested-With, Content-Type, Accept",
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    }
  }


  async getUsers() {
    try {
      // const respues = axios.post("IntranetSurti/WebServicesSurtiAppRest/getCategory", {}, this.config)
      const respues = axios.get("https://rickandmortyapi.com/api/character/", {})
        .then(response => {
          console.log(response)
          this.datos = response.data.results;
        })
    } catch (error) {
      console.log(error.status);
      console.log(error.error); // error message as string
      console.log(error.headers);
    }
  }
}
