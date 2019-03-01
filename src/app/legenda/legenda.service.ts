import { Injectable } from '@angular/core';
import { Legenda } from '../model/legenda';
import { Result } from '../model/result';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Esito } from '../model/esito';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CommonService } from '../core/common.service';

@Injectable({
  providedIn: 'root'
})
export class LegendaService {
  endpoint = 'http://localhost:8081/';

  constructor(private http: HttpClient, private commonService: CommonService) { }

  getLegende (): Observable<any> {
   return this.http.get<Result<Legenda>>(this.endpoint + 'legenda/findAll').pipe(
     map(
      (data: Result<Legenda>) => this.commonService.unWrapResult(data)
     )
   );
  }

  saveLegenda (legenda: Legenda): Observable<any> {
    return this.http.post<Result<Legenda>>(this.endpoint + 'legenda/new', legenda).pipe(map(
      (result: Result<Legenda>) => this.commonService.unWrapResult(result)
    ));
  }

  updateLegenda (legenda: Legenda): Observable<any> {
    return this.http.patch<Result<Legenda>>(this.endpoint + 'legenda/' + legenda.id, legenda).pipe(map(
      (result: Result<Legenda>) => this.commonService.unWrapResult(result)
    ));
  }

  deleteLegenda (idLegenda: number): Observable<any> {
    return this.http.delete<Result<Legenda>>(this.endpoint + 'legenda/' + idLegenda).pipe(map(
      (result: Result<Legenda>) => this.commonService.unWrapResult(result)
    ));
  }
}
