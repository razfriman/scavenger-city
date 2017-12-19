import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).map((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
        const response = event as HttpResponse<any>;
        console.log(response);
        return event;
      }
    });
  }
}

// .catch(err => {
//   if (err instanceof HttpErrorResponse) {
//     console.log(err);

//     if (err.status === 401) {
//       // JWT expired, go to login
//       // Observable.throw(err);
//     }
//   }
// })
