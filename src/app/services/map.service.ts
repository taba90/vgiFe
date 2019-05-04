import { Injectable} from '@angular/core';
import { VgiPoint } from '../model/point';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Esito } from '../model/esito';
import { Observable } from 'rxjs';
import { LegendaService } from './legenda.service';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class MapService {


endpoint =  environment.endpoint;

points: VgiPoint [];

httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};


  constructor(private http: HttpClient, private legendaService: LegendaService) { }


savePoint (point: VgiPoint): Observable<Esito> {
  return this.http.post<Esito>(this.endpoint + '/location', point, this.httpOptions);
}

updatePoint (point: VgiPoint): Observable<Esito> {
  return this.http.patch<Esito>(this.endpoint + '/location', point, this.httpOptions);
}

getUserLocations(): Observable<any> {
  return this.http.get<VgiPoint[]>(this.endpoint + '/location' + '/user');
}

searchLocations(annoDa: number, annoA: number, idLegenda: number): Observable<any> {
  const params = {
    'annoDa': annoDa !== null && typeof annoDa !== 'undefined' ? annoDa.toString() : '',
    'annoA': annoA !== null && typeof annoA !== 'undefined' ? annoA.toString() : '',
    'idLegenda': idLegenda !== null && typeof idLegenda !== 'undefined' ? idLegenda.toString() : ''
  };
  return this.http.get<VgiPoint[]>(this.endpoint + '/location' + '/search', {params});
}

getLocationById(idLocation: number): Observable<VgiPoint> {
  return this.http.get<VgiPoint>(this.endpoint + '/location/' + idLocation);
}

getUserLocationsByLegenda(idLegenda: number): Observable<any> {
  return this.http.get<VgiPoint[]>(this.endpoint + '/location/' + idLegenda + '/user');
}

deleteLocationById(idLocation: number): Observable<Esito> {
  return this.http.delete<Esito>(this.endpoint + '/location/' + idLocation);
}

}
