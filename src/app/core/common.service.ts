import { Injectable } from '@angular/core';
import { Result } from '../model/result';

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

  unWrapResponse(response: Response): string {
    if (response.status !== 200) {
      return 'Errore durante la chiamata. Status: ' + response.statusText;
    }
  }

}
