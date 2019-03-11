import { Injectable } from '@angular/core';
import { Legenda } from '../model/legenda';
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
   return this.http.get<Legenda[]>(this.endpoint + 'legenda/findAll');
  }

  saveLegenda (legenda: Legenda): Observable<any> {
    return this.http.post<Legenda>(this.endpoint + 'legenda/new', legenda);
  }

  updateLegenda (legenda: Legenda): Observable<any> {
    return this.http.patch<Legenda>(this.endpoint + 'legenda/' + legenda.id, legenda);
  }

  deleteLegenda (idLegenda: number): Observable<any> {
    return this.http.delete<Esito>(this.endpoint + 'legenda/' + idLegenda);
  }
}
