import { Injectable } from '@angular/core';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouterHistoryService {
  private previousUrl: string[];
  private currentUrl: string;

  constructor(private router : Router) {
    console.log("RouterHistoryService Constructor");
    this.previousUrl =[];
    this.currentUrl = this.router.url;

    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
        this.previousUrl.push(this.currentUrl);
      };
    });
  }

  getCurrentUrl() {
    return this.currentUrl;
  }

  getPreviousUrl(index = -1) {
    return this.previousUrl[this.previousUrl.length + index];
  }
}
