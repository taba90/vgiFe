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
import { Legenda } from '../model/legenda';
import { LegendaService } from '../legenda/legenda.service';
import Style from 'ol/style/style';
import { CommonService } from '../core/common.service';
import { map } from 'rxjs/operators';



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


  constructor(private http: HttpClient, private legendaService: LegendaService, private commonService: CommonService) { }


savePoint (point: VgiPoint, idLegenda: number): Observable<Result<VgiPoint>> {
  const risultato: Result<VgiPoint> = new Result<VgiPoint>();
  return this.http.post<Result<VgiPoint>>
  (this.endpoint + 'location/' + idLegenda.toString() + '/new', point, this.httpOptions);
}

getUserLocations(): Observable<VgiPoint []> {
  return this.http.get<Result<VgiPoint>>(this.endpoint + 'location' + '/user').pipe(map(
    (result: Result<VgiPoint>) => this.commonService.unWrapResult(result)
    )
  );
}

getLocationById(idLocation: number): Observable<VgiPoint> {
  return this.http.get<Result<VgiPoint>>(this.endpoint + 'location/' + idLocation).pipe(map(
    (result: Result<VgiPoint>) => this.commonService.unWrapResult(result)
  )
  );
}

getUserLocationsByLegenda(idLegenda: number): Observable<Result<VgiPoint>> {
  return this.http.get<Result<VgiPoint>>(this.endpoint + 'location/' + idLegenda + '/user');
}

deleteLocationById(idLocation: number): Observable<VgiPoint> {
  return this.http.delete<Result<VgiPoint>>(this.endpoint + 'location/' + idLocation).pipe(map(
    (data: Result<VgiPoint>) => this.commonService.unWrapResult(data)
  ));
}





getMarkerStyle(color: string): Style {
  return new Style({
    image : new OlCircle(({
          fill: new OlFill({
            color: color,
          }),
          radius: 5,
          stroke: new OlStroke({
          color: color,
          width: 3,
        }),
    }))
  });
}

}
