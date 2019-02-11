import { Component, OnInit } from '@angular/core';
import Map from 'ol/map';
import OSM from 'ol/source/osm';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJson from 'ol/format/GeoJSON';
import OlView from 'ol/View';
import OlProj from 'ol/proj';
import Style from 'ol/style/style';
import OlCircle from 'ol/style/circle';
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
import { AddpointComponent } from './addpoint/addpoint.component';
import { MatDialogConfig, MatGridTileFooterCssMatStyler, MatDialogRef } from '@angular/material';
import { DialogService } from '../core/dialog.service';
import { VgiPoint } from '../model/point';
import { MapService } from './map.service';
import { Result } from '../model/result';
import { map } from 'rxjs/operators';
import ol from 'ol';
import { ReadOptions } from '../model/readoptions';


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
private beFeatures: VgiPoint[];
private geoJsonFormat: GeoJson;
private selectInteraction: Select;
private selectedFeature: any;

private markerStyleFe: Style = new Style({
  image : new OlCircle(({
        fill: new OlFill({
          color: 'red',
        }),
        radius: 5,
        stroke: new OlStroke({
        color: 'red',
        width: 3,
      }),
  }))
});
private markerStyleBe: Style = new Style({
  image : new OlCircle(({
        fill: new OlFill({
          color: 'green',
        }),
        radius: 5,
        stroke: new OlStroke({
        color: 'green',
        width: 3,
      }),
  }))
});


  constructor(private dialogService: DialogService<VgiPoint>, private mapService: MapService) { }

  ngOnInit() {
    this.osmSource = new OSM();
    this.geoJsonFormat = new GeoJson({
      defaultDataProjection: 'EPSG:3857',
      featureProjection: 'EPSG:3857'});
    this.beVectSource = new VectorSource(
      {
        format: this.geoJsonFormat,
      });
    this.vectSource = new VectorSource();
    this.feVectorLayer = new VectorLayer({ source: this.vectSource, style: this.markerStyleFe, renderBuffer: 200 });
    this.beVectorLayer = new VectorLayer({ source: this.beVectSource, style: this.markerStyleBe });
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
      const coordinates: [number, number] = point.getCoordinates();
      const dialogConfig: MatDialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.position = {
        top : '0px',
        left : '0px' ,
      };
      dialogConfig.data = {
        lon: coordinates [0],
        lat: coordinates [1]
      };
      const dialogRef: MatDialogRef<AddpointComponent> = this.dialogService.openDialog(AddpointComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(
        () => {
            this.vectSource.clear();
            this.beVectSource.clear();
            this.getBePoints();
            this.beVectSource.refresh();

        }
      );
    });
    this.getBePoints();
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

getBePoints () {
  this.mapService.callUserLocations().subscribe(
    (data: Result<VgiPoint>) => {
      for (const point of data.results) {
        const feature: Feature = this.geoJsonFormat.readFeature(point.location, new ReadOptions(this.map) );
        this.beVectSource.addFeature(feature);
      }
    },
    error => console.log(error),
  );
}


}
