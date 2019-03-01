import { Component, OnInit } from '@angular/core';
import Map from 'ol/map';
import OSM from 'ol/source/osm';
import Layer from 'ol/layer';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJson from 'ol/format/GeoJSON';
import OlView from 'ol/View';
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
import { MapBrowserPointerEvent, MapBrowserEvent } from 'openlayers';
import { AddpointComponent } from './addpoint/addpoint.component';
import { MatDialogConfig, MatGridTileFooterCssMatStyler, MatDialogRef } from '@angular/material';
import { DialogService } from '../core/dialog.service';
import { VgiPoint } from '../model/point';
import { MapService } from './map.service';
import { ReadOptions } from '../model/readoptions';
import { MessageComponent } from '../message/message.component';
import { Message } from '../model/message';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {

private map: Map;
private osmSource: OSM = new OSM();
private beVectSource: VectorSource;
private vectSource: VectorSource = new VectorSource();
// private view: OlView;
// private layers: Layer [];
private beVectorLayer: VectorLayer;
private feVectorLayer: VectorLayer;
private geoJsonFormat: GeoJson = new GeoJson({
  defaultDataProjection: 'EPSG:3857',
  featureProjection: 'EPSG:3857'});
private selectedPoint: VgiPoint;
private markerStyle: Style = new Style({
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


  constructor(private dialogService: DialogService<VgiPoint>, private mapService: MapService) { }

  ngOnInit() {

    this.beVectSource = new VectorSource(
      {
        format: this.geoJsonFormat
      });
    this.feVectorLayer = new VectorLayer({ source: this.vectSource, style: this.markerStyle, renderBuffer: 200 });
    this.beVectorLayer = new VectorLayer({ source: this.beVectSource, style: this.markerStyle });
    // this.layers = this.getLayers();
    // this.view = this.getView();
    this.map = this.getMap();
    this.map.on('click', (e: MapBrowserEvent) => {
      this.map.forEachFeatureAtPixel(e.pixel, (feature: Feature) => {
        console.log(feature);
        this.mapService.getLocationById(feature.getId() as number).subscribe(
          (data: VgiPoint | Message) => {
            if (data instanceof VgiPoint) {
            const dialogConf: MatDialogConfig = this.getDialogConfig(e.pixel, 'Modifica posizione', data, false);
            const dialogRef: MatDialogRef<AddpointComponent> = this.dialogService.openDialog(AddpointComponent, dialogConf);
            console.log(this.selectedPoint);
          } else {
            this.dialogService.openMessageAlert(MessageComponent, data as Message);
          }
        }
        );
      }
      );
    }
    );
    this.map.on('dblclick', (e: MapBrowserPointerEvent) => {
      const lonlat = toLonLat(e.coordinate);
      const point: OlPoint = this.getPointFromLonLat(lonlat);
      const feature = new Feature({
        geometry: point
      });
      this.vectSource.addFeature(feature);
      const pixels: number [] = e.pixel;
      const coordinates: number [] = point.getCoordinates();
      const pointVgi: VgiPoint = new VgiPoint();
      pointVgi.longitude = coordinates[0];
      pointVgi.latitude = coordinates[1];
      const dialogConfig: MatDialogConfig = this.getDialogConfig(pixels, 'Salva posizione', pointVgi, true);
      const dialogRef: MatDialogRef<AddpointComponent> = this.dialogService.openDialog(AddpointComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(
        () => {
            this.vectSource.clear();
            this.beVectSource.clear();
            this.getBePoints();
            this.beVectSource.refresh();

        }
      );
      dialogRef.componentInstance.pointAdded.subscribe(() => this.getBePoints());
    });
    this.getBePoints();
}


removeAllMarkers() {
    this.vectSource.clear();
}

getBePoints () {
  this.beVectSource.clear();
  this.mapService.getUserLocations().subscribe(
    (data: VgiPoint [] | Message) => {
      if ( data instanceof Array ) {
      for (const point of data as VgiPoint[]) {
        const feature: Feature = this.geoJsonFormat.readFeature(point.location, new ReadOptions(this.map) );
        feature.setStyle(this.getStyle(point.legenda.colore));
        feature.setId(point.id);
        this.beVectSource.addFeature(feature);
      }
    } else {
      this.dialogService.openMessageAlert(MessageComponent, data as Message);
    }
    },
    error => console.log(error),
  );
}

getPointById (id: number| string): VgiPoint | void {
  id = id as number;
  this.mapService.getLocationById(id).subscribe(
    (point: VgiPoint) => this.selectedPoint = point
  );
}

getStyle(color: string): Style {
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

getView(): OlView {
  return new OlView({
    zoom: 13,
    minZoom: 10,
    center: fromLonLat([11.1722, 43.5599 ]),
  });
}

  getLayers(): Layer[] {
    const initialLayers: Layer[] = [
      new TileLayer({
        source: this.osmSource,
      }),
      this.beVectorLayer,
      this.feVectorLayer,
    ];
    return initialLayers;
  }

  getMap (): Map {
    return new Map({
      interactions : defaults({doubleClickZoom : false}),
      target: 'map',
      layers: this.getLayers(),
      view: this.getView(),
    });
  }

getPointFromLonLat(lonlat: string[]): OlPoint {
  const longitude = parseFloat(lonlat[0]);
  const latitude = parseFloat(lonlat[1]);
  console.log('first lat: ' + latitude + ' first long: ' + longitude);
  return new OlPoint(fromLonLat([longitude, latitude])); // transform([longitude, latitude], 'EPSG:4326', 'EPSG:3857'));
}

  getDialogConfig(pixels: number[], modalName: string, point: VgiPoint, isNew: boolean): MatDialogConfig {
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.position = {
      top: '0px',
      left: '80%',
    };
    dialogConfig.data = {
      modalName: modalName,
      point: point,
      isNew: isNew,
    };
    return dialogConfig;
  }

}
