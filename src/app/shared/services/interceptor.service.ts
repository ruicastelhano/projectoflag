import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ActivationEnd, Router} from '@angular/router';
import {HttpCancelService} from './http-cancel.service';
import {takeUntil} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  constructor(router: Router, private httpCancelService: HttpCancelService) {
    router.events.subscribe(event => {
      if (event instanceof ActivationEnd) {
        this.httpCancelService.cancelPendingRequests();
      }
    });
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next
      .handle(req)
      .pipe(takeUntil(this.httpCancelService.onCancelPendingRequests()));
  }
}
