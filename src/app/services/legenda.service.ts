import { Injectable } from '@angular/core';
import { Legenda } from '../model/legenda';
import { HttpClient } from '@angular/common/http';
import { Esito } from '../model/esito';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LegendaService {
  endpoint = 'http://localhost:8081/';

  constructor(private http: HttpClient) { }

  getLegende (): Observable<any> {
   return this.http.get<Legenda[]>(this.endpoint + 'legenda/findAll');
  }

  saveLegenda (legenda: Legenda): Observable<any> {
    return this.http.post<Legenda>(this.endpoint + 'legenda', legenda);
  }

  updateLegenda (legenda: Legenda): Observable<any> {
    return this.http.patch<Legenda>(this.endpoint + 'legenda', legenda);
  }

  deleteLegenda (idLegenda: number): Observable<any> {
    return this.http.delete<Esito>(this.endpoint + 'legenda/' + idLegenda);
  }
}
