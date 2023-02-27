import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatBotGuard implements CanActivate {
  canActivate() {
    setTimeout(() => {
      const chatElement = document.querySelector("#chatIframe")

      if (chatElement) {
        if (window.location.pathname.includes("sidebar-menu")) {
          chatElement.classList.remove("hide-chat")
        } else {
          chatElement.classList.add("hide-chat")
        }
      }

    }, 100)

    return true
  }

}
