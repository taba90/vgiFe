import { Component, OnInit } from '@angular/core';
import Map from 'ol/map';
import VectorLayer from 'ol/layer/Vector';
import OlPoint from 'ol/geom/Point';
import {fromLonLat} from 'ol/proj.js';
import { MapService } from 'src/app/services/map.service';
import { MapBrowserPointerEvent } from 'openlayers';
import Feature from 'ol/Feature';
import {toLonLat} from 'ol/proj.js';
import { DialogService } from 'src/app/services/dialog.service';
import { AddpointComponent } from '../addpoint/addpoint.component';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {

  constructor(private mapService: MapService, private dialogService: DialogService) { }

  ngOnInit() {

    const map: Map = this.mapService.initializeMap();
    const feVectLayer: VectorLayer = this.mapService.getFeVectorLayer();
    map.on('dblclick', (e: MapBrowserPointerEvent) => {
      console.log(e.coordinate);
      const lonlat = toLonLat(e.coordinate);
      const longitude = parseFloat(lonlat[0]);
      const latitude = parseFloat(lonlat[1]);
      const point: OlPoint = new OlPoint(fromLonLat([longitude, latitude])); // transform([longitude, latitude], 'EPSG:4326', 'EPSG:3857'));
      const feature = new Feature({
        geometry: point
      });
      this.mapService.getVectSource().addFeature(feature);
      const pixels: [number, number] = e.pixel;
      this.dialogService.openDialog(AddpointComponent, feature, pixels);
    });
    /*this.selectInteraction = new OlSelect({
      layers: [
        this.feVectorLayer,
        this.beVectorLayer
      ]
    }
  );*/
  /*this.map.addInteraction(this.selectInteraction);
  this.selectedFeature = this.selectInteraction.getFeatures();
    this.selectedFeature.on('doubleclick', function(event) {
      const feature = event.target.item(0);
      console.log(feature);
    });*/


    // find DoubleClickZoom interaction
    /*const dblClickInteraction = () => {
      for (let i = 0; i < this.map.getInteractions().getArray().size; i++) {
      if (this.map.getInteractions().getArray()[i] instanceof DblClickZoom) {
        return this.map.getInteraction().getArray()[i];
      }
    }
    if (dblClickInteraction != null && !(typeof dblClickInteraction  === 'undefined')) {
      this.map.removeInteraction(dblClickInteraction);
      console.log('interaction removed');
    }
  };*/
}

  addPoint(event: MapBrowserPointerEvent) {
  }
  onClickedPoint() {
    console.log('pointClicked');
  }

  addToBeVectSource(point: OlPoint) {
   // this.beVectSource.addFeature(point);
  }

  /*removeAllMarkers() {
    this.vectorSource.clear();
  }*/

 /** addMarker = ( lon, lat) => {
    console.log('lon:', lon);
    console.log('lat:', lat);

    const feature = new OlFeature({
      geometry: new OlPoint(fromLonLat([lon, lat])),
    });

    this.vectorSource.addFeature(feature);

  }**/



}
