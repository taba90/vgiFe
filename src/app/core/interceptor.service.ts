import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { ModalService } from './modal-popups.service';
import { MessageComponent } from '../message/message.component';
import { Message } from '../model/message';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private modalService: ModalService<Message>) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token: string = localStorage.getItem('X-Vgi');
    if (token != null) {
      const req: HttpRequest<any> = request.clone({
        setHeaders: {
          'X-Vgi': token,
        }
      }
      );
      const headers: HttpHeaders = new HttpHeaders();
      headers.set('X-Vgi', token);
      request = this.setHeaders(request, headers);
      return next.handle(req).pipe(
        retry(1),
        catchError((error) => {
          let message: string;
          if (error.error instanceof ErrorEvent) {
            message = error.error.message;
          } else {
            const errorResponse: HttpErrorResponse = error as HttpErrorResponse;
            message = errorResponse.error.message;
            this.modalService.openMessageAlert(MessageComponent, new Message(message, 'red'));
            if (errorResponse.status as number === 403 ||
              errorResponse.status as number === 401) {
              if (localStorage.getItem('X-Vgi') !== null) {
                localStorage.removeItem('X-Vgi');
              }
            }
          }
          throw message;
        })
      );
    } else {
      return next.handle(request);
    }
  }

  setHeaders(request: HttpRequest<any>, reqHeaders: HttpHeaders): HttpRequest<any> {
    request.clone({
      headers: reqHeaders
    }
    );
    return request;
  }
}
