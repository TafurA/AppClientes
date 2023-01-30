import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class SessionGuard implements CanActivate {
  constructor() { }

  canActivate() {
    if (!localStorage.userSessionData) {
      return false
    }
    return true;
  }

}
