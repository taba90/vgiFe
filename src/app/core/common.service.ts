import { Injectable } from '@angular/core';
import { Result } from '../model/result';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  unWrapResult(result: Result<any>) {
    if (result.esito.codice === '001') {
      if (result.results != null) {
        return result.results;
      }
    } else {
      throw result.esito.descrizione;
    }
  }

}
