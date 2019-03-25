import { Component, OnInit } from '@angular/core';
import Map from 'ol/map';
import OSM from 'ol/source/osm';
import Layer from 'ol/layer';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import ImageLayer from 'ol/layer/Image';
import WMSSource from 'ol/source/ImageWMS';
import VectorSource from 'ol/source/Vector';
import GeoJson from 'ol/format/GeoJSON';
import OlView from 'ol/View';
import Style from 'ol/style/style';
import OlCircle from 'ol/style/circle';
import OlFill from 'ol/style/Fill';
import OlStroke from 'ol/style/Stroke';
import Feature from 'ol/Feature';
import OlPoint from 'ol/geom/Point';
import OlControl from 'ol/control/control';
import { defaults } from 'ol/interaction.js';
import { fromLonLat } from 'ol/proj.js';
import { toLonLat } from 'ol/proj.js';
import { MapBrowserPointerEvent, MapBrowserEvent } from 'openlayers';
import { AddpointComponent } from './addpoint/addpoint.component';
import { MatDialogConfig, MatGridTileFooterCssMatStyler, MatDialogRef } from '@angular/material';
import { ModalService } from '../core/modal-popups.service';
import { VgiPoint } from '../model/point';
import { MapService } from './map.service';
import { ReadOptions } from '../model/readoptions';
import { Message } from '../model/message';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {

  map: Map;
  osmSource: OSM = new OSM();
  beVectSource: VectorSource;
  vectSource: VectorSource = new VectorSource();
  wmsSource: WMSSource;
  isWmsAdded = false;
  // private view: OlView;
  // private layers: Layer [];
  beVectorLayer: VectorLayer;
  feVectorLayer: VectorLayer;
  feImageLayer: ImageLayer;
  geoJsonFormat: GeoJson = new GeoJson({
    defaultDataProjection: 'EPSG:3857',
    featureProjection: 'EPSG:3857'
  });
  selectedPoint: VgiPoint;
  markerStyle: Style = new Style({
    image: new OlCircle(({
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


  constructor(private dialogService: ModalService<VgiPoint>, private mapService: MapService) { }

  ngOnInit() {

    this.beVectSource = new VectorSource(
      {
        format: this.geoJsonFormat
      });
    this.feVectorLayer = new VectorLayer({ source: this.vectSource, style: this.markerStyle, renderBuffer: 200 });
    this.beVectorLayer = new VectorLayer({ source: this.beVectSource, style: this.markerStyle });
    this.feImageLayer = new ImageLayer({
      source: this.wmsSource = new WMSSource({
        projection: '4326',
        params: {
          layers: ['rt_ofc.10k13']
        },
        url: 'http://www502.regione.toscana.it/wmsraster/com.rt.wms.RTmap/wms?map=wmsofc',
      }),
    });
    this.map = this.getMap();
    this.map.on('click', (e: MapBrowserEvent) => {
      this.map.forEachFeatureAtPixel(e.pixel, (feature: Feature) => {
        console.log(feature);
        this.mapService.getLocationById(feature.getId() as number).subscribe(
          (data: VgiPoint) => {
            if (!(data instanceof Message)) {
              const dialogConf: MatDialogConfig = this.getDialogConfig(e.pixel, 'Modifica posizione', data, false);
              const dialogRef: MatDialogRef<AddpointComponent> = this.dialogService.openDialog(AddpointComponent, dialogConf);
              const pointSubscription = dialogRef.componentInstance.pointEvent.subscribe(
                () => {
                  this.getBePoints();
                  pointSubscription.unsubscribe();
                });
            }
          },
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
      const pixels: number[] = e.pixel;
      const coordinates: number[] = point.getCoordinates();
      const pointVgi: VgiPoint = new VgiPoint();
      pointVgi.longitude = coordinates[0];
      pointVgi.latitude = coordinates[1];
      const dialogConfig: MatDialogConfig = this.getDialogConfig(pixels, 'Salva posizione', pointVgi, true);
      const dialogRef: MatDialogRef<AddpointComponent> = this.dialogService.openDialog(AddpointComponent, dialogConfig);
      const pointSubscription = dialogRef.componentInstance.pointEvent.subscribe(() => {
        this.getBePoints();
        pointSubscription.unsubscribe();
      }
      );
    });
    this.getBePoints();
  }


  removeAllMarkers() {
    this.vectSource.clear();
  }

  getBePoints() {
    this.removeAllMarkers();
    this.beVectSource.clear();
    this.mapService.getUserLocations().subscribe(
      (data: VgiPoint[]) => {
        if (data instanceof Array) {
          for (const point of data as VgiPoint[]) {
            const feature: Feature = this.geoJsonFormat.readFeature(point.location, new ReadOptions(this.map));
            feature.setStyle(this.getStyle(point.legenda.colore));
            feature.setId(point.id);
            this.beVectSource.addFeature(feature);
          }
        }
      },
    );
  }

  getPointById(id: number | string): VgiPoint | void {
    id = id as number;
    this.mapService.getLocationById(id).subscribe(
      (point: VgiPoint) => this.selectedPoint = point,
    );
  }

  getStyle(color: string): Style {
    return new Style({
      image: new OlCircle(({
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
      center: fromLonLat([11.1722, 43.5599]),
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

  getMap(): Map {
    const addOrtophoto: Element = document.createElement('button');
    addOrtophoto.innerHTML = 'O';
    addOrtophoto.addEventListener('click', () => this.getWMSLayer());
    const divEl: Element = document.createElement('div');
    divEl.setAttribute('style', 'top: 65px; left: .5em;');
    divEl.className = 'ol-zoom ol-unselectable ol-control';
    divEl.appendChild(addOrtophoto);
    const control: OlControl = new OlControl({
      element: divEl,
    });
    const map: Map = new Map({
      interactions: defaults({ doubleClickZoom: false }),
      target: 'map',
      layers: this.getLayers(),
      view: this.getView(),
    });
    map.addControl(control);
    return map;
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
      top: '',
      bottom: '',
      left: '',
      right: '',
    };
    dialogConfig.data = {
      modalName: modalName,
      point: point,
      isNew: isNew,
    };
    return dialogConfig;
  }

  getWMSLayer() {
    if (!this.isWmsAdded) {
      this.map.getLayers().insertAt(1, this.feImageLayer);
      this.isWmsAdded = true;
    } else {
      // this.wmsSource = null;
      this.map.removeLayer(this.feImageLayer);
      this.isWmsAdded = false;
    }
  }

}
