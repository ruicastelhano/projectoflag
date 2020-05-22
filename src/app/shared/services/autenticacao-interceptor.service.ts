import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const newRequest = req.clone({headers: req.headers.append(
      'Authorization',
        '3201dd30f091353a6d3f26a3fa5b9b3955a41dda',
        ),
    });
    // console.log(newRequest);
    return next.handle(newRequest);
  }
}
