import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToggleMenuGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    setTimeout(() => {
      console.log('current url:', window.location.pathname);
      if (window.location.pathname.includes("sidebar-menu")) {
        document.querySelector("app-header").classList.add("test")
        document.querySelector("ion-tab-bar").classList.remove("test")
      }
      else if (
        window.location.pathname.includes("splash") ||
        window.location.pathname.includes("welcome") ||
        window.location.pathname.includes("login") ||
        window.location.pathname.includes("profile") ||
        window.location.pathname.includes("order-detail") ||
        window.location.pathname.includes("order-history") ||
        window.location.pathname.includes("favorite") ||
        window.location.pathname.includes("poll") ||
        window.location.pathname.includes("register") ||
        window.location.pathname.includes("car")
      ) {
        document.querySelector("app-header").classList.add("test")
        document.querySelector("ion-tab-bar").classList.add("test")
      } else {
        document.querySelector("app-header").classList.remove("test")
        document.querySelector("ion-tab-bar").classList.remove("test")
      }
    }, 200)
    return true;
  }

}
