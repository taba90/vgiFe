import { Component, OnInit } from '@angular/core';
import OlMap from 'ol/Map';
import OSM from 'ol/source/osm';
import OlTileLayer from 'ol/layer/Tile';
import OlVectorLayer from 'ol/layer/Vector';
import OlView from 'ol/View';
import {transform} from 'ol/proj';
import {toLonLat} from 'ol/proj';
import {fromLonLat} from 'ol/proj';
import OlStyle from 'ol/style/style';
import OlCircle from 'ol/style/Circle';
import OlIcon from 'ol/style/Icon';
import OlFill from 'ol/style/Fill';
import OlStroke from 'ol/style/Stroke';
import OlVectorSource from 'ol/source/Vector';
import OlFeature from 'ol/Feature';
import OlPoint from 'ol/geom/Point';
import interaction from 'ol/interaction';
import { ObserversModule } from '@angular/cdk/observers';
import { mapChildrenIntoArray } from '@angular/router/src/url_tree';



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor() { }

  map: OlMap;
  source: OSM;
  layers: [OlTileLayer, OlVectorLayer, OlVectorLayer]; //  OlTileLayer;
  beVectSource: OlVectorSource;
  view: OlView;
  vectorSource: OlVectorSource;
  marker: OlFeature;
  markers: [];

  ngOnInit() {
    const markerStyle = new OlStyle({
      image: new OlIcon(/**  {olx.style.IconOptions} */ ({
        anchor: [0.5, 0.5],
        anchorXUnits: 'fraction',
        anchorYUnits: 'fraction',
        src: 'https://wiki.openstreetmap.org/w/images/c/c5/Orienteering-icon-16px.png'
      }))
    });
    /*this.marker = new OlFeature({
      geometry: new OlPoint(fromLonLat([11.1822, 43.6699 ]))
    });*/

    this.source = new OSM();

    this.vectorSource = new OlVectorSource({
      // features: [this.marker]
    });

    this.beVectSource = new OlVectorSource({

    });

    this.layers = [
      new OlTileLayer({
      source: this.source,
      // minResolution: 200,
      // maxResolution: 2000,
      projection: 'EPSG:3857'
    }),
    new OlVectorLayer({
      source: this.beVectSource,
      projection : 'EPSG:3857',
      style: markerStyle
    }),
    new OlVectorLayer({
      source: this.vectorSource,
      projection : 'EPSG:3857',
      style: markerStyle
    }),
  ],

    this.view = new OlView({
      // center: fromLonLat([11.1722, 43.5599 ]),
      zoom: 7,
      minZoom: 6,
      center: fromLonLat([11.1722, 43.5599 ]), // transform([11.1722, 43.5599 ], 'EPSG:4326', 'EPSG:3857'),
    });

    this.map = new OlMap({
      target: 'map',
      layers: this.layers,
      view: this.view,
    });
    this.map.on('click', (args) => {

      /*this.map.getInteractions().getArray().forEach(function(interaction) {
        if (interaction instanceof ol.interaction.DoubleClickZoom) {
          this.map
        }
      });*/
      console.log(args);
      // const lonlat = tranform(args.coordinate, 'EPSG:3857', 'EPSG:4326');
      const lonlat = toLonLat(args.coordinate);
      const longitude = parseFloat(lonlat[0]);
      const latitude = parseFloat(lonlat[1]);
      const point: OlPoint = new OlPoint(fromLonLat([longitude, latitude])); // transform([longitude, latitude], 'EPSG:4326', 'EPSG:3857'));
      const feature = new OlFeature({
        geometry: point,
      });
      this.vectorSource.addFeature(feature);
      // this.map.zoomToMaxExtent();
    });
     // dont worry about coordinate type 0,0 will be in west coast of africa
  }

  addToBeVectSource(point: OlPoint) {
    this.beVectSource.addFeature(point);
  }

 /** addMarker = ( lon, lat) => {
    console.log('lon:', lon);
    console.log('lat:', lat);

    const feature = new OlFeature({
      geometry: new OlPoint(fromLonLat([lon, lat])),
    });

    this.vectorSource.addFeature(feature);

  }**/



}
