import { Injectable, Inject } from '@angular/core';
import Map from 'ol/map';
import OSM from 'ol/source/osm';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import OlView from 'ol/View';
import OlProj from 'ol/proj';
import OlStyle from 'ol/style/style';
import OlCircle from 'ol/style/Circle';
import OlIcon from 'ol/style/Icon';
import OlFill from 'ol/style/Fill';
import OlStroke from 'ol/style/Stroke';
import Feature from 'ol/Feature';
import Select from 'ol/interaction/select';
import OlPoint from 'ol/geom/Point';
import {defaults} from 'ol/interaction.js';
import {fromLonLat} from 'ol/proj.js';
import {toLonLat} from 'ol/proj.js';
import Conditions from 'ol/events/condition';
import Layer from 'ol/layer/Layer';
import { VgiPoint } from '../model/point';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Result } from '../model/result';
import { Esito } from '../model/esito';
import { Observable } from 'rxjs';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MapService {
private map: Map;
private osmSource: OSM;
private beVectSource: VectorSource;
private vectSource: VectorSource;
private view: OlView;
private layers: [TileLayer, VectorLayer, VectorLayer];
private marker: Feature;
private markers: [];
private beVectorLayer: VectorLayer;
private feVectorLayer: VectorLayer;

private selectInteraction: Select;

private selectedFeature: any;

endpoint = 'http://localhost:8081/';

httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};


  constructor(private http: HttpClient) { }


savePoint (point: VgiPoint, idLegenda: number) {
  const risultato: Result<VgiPoint> = new Result<VgiPoint>();
  this.http.post(this.endpoint + 'location/' + idLegenda.toString() + '/new', point, this.httpOptions)
    .subscribe(
      (result: Result<VgiPoint>) => {
        risultato.setResult(result.result);
        risultato.setEsito(result.esito);
      },
      (error) => {
        const err: Esito = new Esito('002', 'Response erro' + error);
        risultato.setEsito(err);
      },
    );
    return risultato;
}

callUserLocations(): Observable<Result<VgiPoint>> {
  return this.http.get<Result<VgiPoint>>(this.endpoint + 'location' + '/user');
}

}
