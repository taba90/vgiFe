import { Injectable} from '@angular/core';
import Map from 'ol/map';
import OSM from 'ol/source/osm';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import OlView from 'ol/View';
import OlCircle from 'ol/style/Circle';
import OlFill from 'ol/style/Fill';
import OlStroke from 'ol/style/Stroke';
import Feature from 'ol/Feature';
import Select from 'ol/interaction/select';
import { VgiPoint } from '../model/point';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Esito } from '../model/esito';
import { Observable } from 'rxjs';
import Style from 'ol/style/style';
import { LegendaService } from './legenda.service';



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


  constructor(private http: HttpClient, private legendaService: LegendaService) { }


savePoint (point: VgiPoint): Observable<Esito> {
  return this.http.post<Esito>(this.endpoint + 'location', point, this.httpOptions);
}

updatePoint (point: VgiPoint): Observable<Esito> {
  return this.http.patch<Esito>(this.endpoint + 'location', point, this.httpOptions);
}

getUserLocations(): Observable<any> {
  return this.http.get<VgiPoint[]>(this.endpoint + 'location' + '/user');
}

getLocationById(idLocation: number): Observable<VgiPoint> {
  return this.http.get<VgiPoint>(this.endpoint + 'location/' + idLocation);
}

getUserLocationsByLegenda(idLegenda: number): Observable<any> {
  return this.http.get<VgiPoint[]>(this.endpoint + 'location/' + idLegenda + '/user');
}

deleteLocationById(idLocation: number): Observable<Esito> {
  return this.http.delete<Esito>(this.endpoint + 'location/' + idLocation);
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
