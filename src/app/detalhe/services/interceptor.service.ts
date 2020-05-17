import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {EMPTY, Observable} from 'rxjs';
import {ActivationEnd, Router} from '@angular/router';
import {HttpCancelService} from './http-cancel.service';
import {takeUntil} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  constructor(router: Router,
              private httpCancelService: HttpCancelService) {
    router.events.subscribe(event => {
      // An event triggered at the end of the activation part of the Resolve phase of routing.
      if (event instanceof ActivationEnd) {
        // Cancel pending calls
        this.httpCancelService.cancelPendingRequests();
      }
    });
  }

  intercept<T>(req: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
    return next.handle(req).pipe(takeUntil(this.httpCancelService.onCancelPendingRequests()));
  }
}