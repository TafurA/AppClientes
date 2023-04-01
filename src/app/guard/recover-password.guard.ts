import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecoverPasswordGuard implements CanActivate {
  constructor(public nvCtrl: NavController) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (window.localStorage.getItem("recoverPassword") === "change") {
      this.nvCtrl.navigateRoot("/tabs/forgot-password")
      return false
    }

  }

}
