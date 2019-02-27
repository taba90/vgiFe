import { Injectable } from '@angular/core';
import { Result } from '../model/result';
import { HttpErrorResponse } from '@angular/common/http';

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
        return result.esito;
      }
    } else {

      throw result.esito.descrizione;
    }
  }

  unWrapErrorResponse(response: HttpErrorResponse): string {
    let message: string = null;
      if (response.status === 403) {
          message = response.headers.get('Ex-Token');
          if (message === null) {
            message = 'Errore durante la chiamata. Status: ' + response.statusText;
          } else {
            localStorage.removeItem('X-Vgi');
          }
      } else {
        message = 'Errore durante la chiamata. Status: ' + response.statusText;
      }
    return message;
  }

}
