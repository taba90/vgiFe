import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VgiPoint } from '../model/point';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

   const token: string = localStorage.getItem('X-Vgi');
   if (token != null) {
     const req: HttpRequest<any> = request.clone({
       setHeaders: {
         'X-Vgi': token,
       }
     }
     );
     const headers: HttpHeaders = new HttpHeaders ();
     headers.set('X-Vgi', token);
     request = this.setHeaders(request, headers);
     return next.handle(req);
   } else {
     return next.handle(request);
   }
  }

   setHeaders (request: HttpRequest<any>, reqHeaders: HttpHeaders): HttpRequest<any> {
     request.clone({
       headers: reqHeaders
     }
     );
     return request;
   }
}
