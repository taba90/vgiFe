import { Component, OnInit } from '@angular/core';
import Map from 'ol/map';
import OSM from 'ol/source/osm';
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
import { MatDialogConfig, MatDialogRef } from '@angular/material';
import { VgiPoint } from 'src/app/model/point';
import { ModalService } from 'src/app/services/modal-popups.service';
import { MapService } from 'src/app/services/map.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { ReadOptions } from 'src/app/home/map/readoptions';
import { environment } from 'src/environments/environment';
import { SearchComponent } from './search/search.component';
import { AppCostants } from 'src/app/app-costants';


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
  beVectorLayer: VectorLayer;
  feVectorLayer: VectorLayer;
  feImageLayer: ImageLayer;
  selectedPoint: VgiPoint;


  geoJsonFormat: GeoJson = new GeoJson({
    defaultDataProjection: 'EPSG:3857',
    featureProjection: 'EPSG:3857'
  });

  style: Style;

  markerStyle: Style = new Style({
    image: new OlCircle(({
      fill: new OlFill({
        color: 'red',
      }),
      radius: 3,
      stroke: new OlStroke({
        color: 'red',
        width: 3,
      }),
    }))
  });


  constructor(private dialogService: ModalService<VgiPoint>, private mapService: MapService) { }

  ngOnInit() {

    // definisco i layers
    this.beVectSource = new VectorSource({ format: this.geoJsonFormat });
    this.feVectorLayer = new VectorLayer({ source: this.vectSource, style: this.markerStyle, renderBuffer: 200 });
    this.beVectorLayer = new VectorLayer({ source: this.beVectSource, style: this.markerStyle });
    this.feImageLayer = new ImageLayer({
      source: this.wmsSource = new WMSSource({
        projection: '3857',
        params: {
          layers: [environment.paramWMS]
        },
        url: environment.urlWMS,
      }),
    });

    // instanzio mappa
    this.map = new Map({
      interactions: defaults({ doubleClickZoom: false }),
      target: 'map',
      layers: [
        new TileLayer({
          source: this.osmSource,
        }),
        this.beVectorLayer,
        this.feVectorLayer,
      ],
      view: new OlView({
        zoom: 14,
        // minZoom: 8,
        center: fromLonLat([environment.initialLon, environment.initialLat]),
      })
    });
    this.addEventsControlToMap();
    this.addButtonOrotophoto();
    this.addButtonRicerca();
    this.addButtonExitSearch();
    this.getBeUserPoints();
  }


  removeAllMarkers() {
    this.vectSource.clear();
  }

  addEventsControlToMap() {
    this.map.on('click', (e: MapBrowserEvent) => {
      this.map.forEachFeatureAtPixel(e.pixel, (feature: Feature) => {
        console.log(feature);
        if (! feature.getId().toString().startsWith(AppCostants.unselectablePointId)) {
          this.mapService.getLocationById(feature.getId() as number).subscribe(
            (data: VgiPoint) => {
              if (!(data instanceof Message)) {
                const dialogConf: MatDialogConfig = this.getDialogConfig(e.pixel, 'Modifica posizione', data, false);
                const dialogRef: MatDialogRef<AddpointComponent> = this.dialogService.openDialog(AddpointComponent, dialogConf);
                const pointSubscription = dialogRef.componentInstance.pointEvent.subscribe(
                  () => {
                    this.getBeUserPoints();
                    pointSubscription.unsubscribe();
                  });
              }
            },
          );
        }
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
        this.getBeUserPoints();
        pointSubscription.unsubscribe();
      }
      );
    });
  }

  getBeUserPoints() {
    this.removeAllMarkers();
    this.beVectSource.clear();
    this.mapService.getUserLocations().subscribe(
      (data: VgiPoint[]) => {
        if (data instanceof Array) {
          const features: Feature [] = [];
          for (const point of data as VgiPoint[]) {
            const feature: Feature = this.geoJsonFormat.readFeature(point.location, new ReadOptions(this.map));
            feature.setStyle(this.getStyle(point.legenda.colore));
            feature.setId(point.id);
            features.push(feature);
          }
          this.beVectSource.addFeatures(features);
        }
      },
    );
  }

  getSearchedPoints() {
    this.removeAllMarkers();
    this.beVectSource.clear();
    const points: VgiPoint [] = this.mapService.points;
    const features: Feature [] = [];
    for (const point of points as VgiPoint []) {
      const feature: Feature = this.geoJsonFormat.readFeature(point.location, new ReadOptions(this.map));
      feature.setStyle(this.getStyle(point.legenda.colore));
      feature.setId(AppCostants.unselectablePointId + point.id);
      features.push(feature);
    }
    console.log(features);
    console.log(this.beVectSource.getFeatures());
    this.beVectSource.addFeatures(features);
    console.log(this.beVectSource.getFeatures());
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
        radius: 3.5,
        stroke: new OlStroke({
          color: color,
          width: 3.5,
        }),
      }))
    });
  }

  addButtonOrotophoto() {
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
    this.map.addControl(control);
  }


  addButtonRicerca() {
    const search: Element = document.createElement('button');
    search.innerHTML = 'R';
    // search.setAttribute('style', 'top: 60px; left: .5em;');
    search.addEventListener('click', () => this.openSearchModal());
    const divEl: Element = document.createElement('div');
    divEl.setAttribute('style', 'top: 97px; left: .5em;');
    divEl.className = 'ol-control ol-unselectable';
    divEl.appendChild(search);
    const control: OlControl = new OlControl({
      element: divEl,
    });
    this.map.addControl(control);
  }

  addButtonExitSearch() {
    const exit: Element = document.createElement('button');
    exit.innerHTML = 'E';
    // search.setAttribute('style', 'top: 60px; left: .5em;');
    exit.addEventListener('click', () => this.getBeUserPoints());
    const divEl: Element = document.createElement('div');
    divEl.setAttribute('style', 'top: 129px; left: .5em;');
    divEl.className = 'ol-control ol-unselectable';
    divEl.appendChild(exit);
    const control: OlControl = new OlControl({
      element: divEl,
    });
    this.map.addControl(control);
  }

  openSearchModal() {
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.position = {
      top: '',
      bottom: '',
      left: '',
      right: '',
    };
    const dialogRef: MatDialogRef<SearchComponent> = this.dialogService.openDialog(SearchComponent, dialogConfig);
    const searchSubscription = dialogRef.componentInstance.searchCompleted.subscribe(() => {
      this.getSearchedPoints();
      searchSubscription.unsubscribe();
    }
    );
  }

  getPointFromLonLat(lonlat: string[]): OlPoint {
    const longitude = parseFloat(lonlat[0]);
    const latitude = parseFloat(lonlat[1]);
    console.log('first lat: ' + latitude + ' first long: ' + longitude);
    return new OlPoint(fromLonLat([longitude, latitude])); // transform([longitude, latitude], 'EPSG:4326', 'EPSG:3857'));
  }

  getDialogConfig(pixels: number[], modalName: string, point: VgiPoint, isNew: boolean): MatDialogConfig {
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    if (isNew) {
      dialogConfig.disableClose = true;
    }
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
