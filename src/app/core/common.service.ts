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
      this.results = result.results;
      this.result = result.result;
    } else {

      throw result.esito.descrizione;
    }
  }

}
