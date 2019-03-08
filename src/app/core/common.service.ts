import { Injectable } from '@angular/core';
import { Result } from '../model/result';
import { HttpErrorResponse } from '@angular/common/http';
import { Message } from '../model/message';
import { Esito } from '../model/esito';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  results: any[];
  result: any;

  constructor() { }

  unWrapResult(result: Result<any>) {
    if (result.esito.codice === '000') {
      if (result.results != null) {
        return result.results;
      } else if (result.result != null) {
        return result.result;
      } else {
        return new Message(result.esito.descrizione, 'green');
      }
    } else {
      if (result.esito.codice === '001') {
        return new Message(result.esito.descrizione, 'orange');
      } else {
        return new Message(result.esito.descrizione, 'red');
      }
    }
  }

  unWrapErrorResponse(response: HttpErrorResponse): Message {
    let message: string = null;
      if (response.status === 403) {
          message = response.headers.get('Auth-Error');
          if (message === null) {
            message = 'Il servizio non è disponibile';
          } else {
            localStorage.removeItem('X-Vgi');
          }
      } else {
        message = 'Errore durante la chiamata. Status: ' + response.statusText;
      }
    return new Message(message, 'red');
  }

}
