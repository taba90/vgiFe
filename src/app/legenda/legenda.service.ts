import { Injectable } from '@angular/core';
import { Legenda } from '../model/legenda';
import { Result } from '../model/result';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Esito } from '../model/esito';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LegendaService {
  endpoint = 'http://localhost:8081/';

  constructor(private http: HttpClient) { }

  getObsLegende (): Observable<Result<Legenda>> {
   return this.http.get<Result<Legenda>>(this.endpoint + 'legenda/findAll').pipe(
     map(
      (data: Result<Legenda>) => new Result<Legenda>(data)
     )
   );
  }
}
