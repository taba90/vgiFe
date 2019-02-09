import { Component, OnInit } from '@angular/core';
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
import { MapBrowserPointerEvent } from 'openlayers';
import { DialogService } from '../dialog/dialog.service';
import { AddpointComponent } from './addpoint/addpoint.component';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {

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
  constructor(private dialogService: DialogService) { }

  ngOnInit() {

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
    this.map.on('dblclick', (e: MapBrowserPointerEvent) => {
      const lonlat = toLonLat(e.coordinate);
      const longitude = parseFloat(lonlat[0]);
      const latitude = parseFloat(lonlat[1]);
      console.log('first lat: ' + latitude + ' first long: ' + longitude);
      const point: OlPoint = new OlPoint(fromLonLat([longitude, latitude])); // transform([longitude, latitude], 'EPSG:4326', 'EPSG:3857'));
      const feature = new Feature({
        geometry: point
      });
      this.vectSource.addFeature(feature);
      const pixels: [number, number] = e.pixel;
      this.dialogService.openDialog(AddpointComponent, point.getCoordinates(), pixels);
    });
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
