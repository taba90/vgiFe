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


  initializeMap (): Map {
    const markerStyle = new OlStyle({
      image: new OlIcon(/**  {olx.style.IconOptions} */({
        // anchor: [0.5, 16],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: 'https://wiki.openstreetmap.org/w/images/c/c5/Orienteering-icon-16px.png'
      }))
    });
    this.osmSource = new OSM();

    this.beVectSource = new VectorSource();
    this.vectSource = new VectorSource();
    this.feVectorLayer = new VectorLayer({ source: this.vectSource, style: markerStyle, renderBuffer: 200 });
    this.beVectorLayer = new VectorLayer({ source: this.vectSource, style: markerStyle });
    this.layers = [
      new TileLayer({
        source: this.osmSource,
      }),
      this.beVectorLayer,
      this.feVectorLayer,
    ];
    this.view = new OlView({
      zoom: 13,
      minZoom: 10,
      center: fromLonLat([11.1722, 43.5599 ]),
    });

    this.map = new Map({
      interactions : defaults({doubleClickZoom : false}),
      target: 'map',
      layers: this.layers,
      view: this.view,
    });
  /*this.map.on('dblclick', (event: MapBrowserPointerEvent) => {

    });*/

      // const lonlat = tranform(args.coordinate, 'EPSG:3857', 'EPSG:4326');
      /*const lonlat = Projection.toLonLat(args.coordinates);
      const longitude = parseFloat(lonlat[0]);
      const latitude = parseFloat(lonlat[1]);
      const point: OlPoint = new OlPoint(fromLonLat([longitude, latitude])); // transform([longitude, latitude], 'EPSG:4326', 'EPSG:3857'));
      const feature = new OlFeature({
        geometry: point,
      });
      this.vectorSource.addFeature(feature);
      // this.map.zoomToMaxExtent();
    });*/
    /*this.selectInteraction = new Select({
      layers: [
        this.feVectorLayer,
        this.beVectorLayer
      ]
    }
  );
  this.map.addInteraction(this.selectInteraction);
  this.selectedFeature = this.selectInteraction.getFeatures();
    this.selectedFeature.on('pointermove', function(event) {
      const feature = event.target.item(0);
      console.log(feature);
    });*/

    return this.map;


}

savePoint (point: VgiPoint, idLegenda: number) {
  const risultato: Result<VgiPoint> = new Result<VgiPoint>();
  this.http.post(this.endpoint + 'location/' + idLegenda.toString() + '/new', point, this.httpOptions)
    .subscribe(
      (result: Result<VgiPoint>) => {
        risultato.setResult(result.result);
        risultato.setEsito(result.esito);
      },
      (error) => {
        const err: Esito = new Esito();
        err.setCodice('002');
        err.setDescrizione('Response erro' + error);
        risultato.setEsito(err);
      },
    );
    return risultato;
}

getFeVectorLayer (): VectorLayer {
  return this.feVectorLayer;
}

getVectSource (): VectorSource {
  return this.vectSource;
}

removeAllMarkers() {
    this.vectSource.clear();
}

}
