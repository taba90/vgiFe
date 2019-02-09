import { Component, OnInit, Inject, Input } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { VgiPoint } from 'src/app/model/point';
import Point from 'ol/geom/Point';
import Feature from 'ol/Feature';
import { Legenda } from 'src/app/model/legenda';
import { Result } from 'src/app/model/result';
import { LegendaService } from 'src/app/legenda/legenda.service';
import { formControlBinding } from '@angular/forms/src/directives/reactive_directives/form_control_directive';
import { Esito } from 'src/app/model/esito';
import { MapService } from '../map.service';
import { DialogService } from 'src/app/dialog/dialog.service';
import { NumberValueAccessor } from '@angular/forms/src/directives';

@Component({
  selector: 'app-addpoint',
  templateUrl: './addpoint.component.html',
  styleUrls: ['./addpoint.component.css'],
})
export class AddpointComponent implements OnInit {

  private formPoint: FormGroup;

  private legende: Legenda[];

  private esito: Esito;

  private lon: number;
  private lat: number;
  private idLegenda: number;

  constructor(private fb: FormBuilder,
    private mapService: MapService,
    private dialogRef: MatDialogRef<AddpointComponent>,
    private dialogService: DialogService,
    private legendaService: LegendaService,
    @Inject(MAT_DIALOG_DATA) public data) {
      this.lon = data.lon;
      this.lat = data.lat;
    }

  ngOnInit() {
    // const point: Point = <Point> feature.getGeometry();
    // const coor: [number, number] = point.getCoordinates();
    const vgiPoint: VgiPoint = new VgiPoint ();
    this.formPoint = new FormGroup({
      'descrizione': new FormControl(null),
      'idLegenda': new FormControl(null),
    });
    this.legendaService.getObsLegende().subscribe(
      (data: Result<Legenda>) => {
        this.legende = data.results;
      },
      (error) => this.esito = new Esito('002', error),
    );

  }

  salvaPosizione () {
    console.log('lat: ' + this.lat + ' lon: ' + this.lon);
    this.dialogService.save(this.dialogRef, this.formPoint);
    this.dialogRef.afterClosed().subscribe( (point: VgiPoint) => {
      point.latitude = this.lat;
      point.longitude = this.lon;
      const vgiPoint: VgiPoint = new VgiPoint(point);
      this.mapService.savePoint(vgiPoint, vgiPoint.getIdLegenda());
    }
    );
  }

  esci() {
    this.mapService.getVectSource().clear();
    this.dialogService.close(this.dialogRef);
    this.dialogRef.afterClosed().subscribe( (point: VgiPoint) => {
      point.setLongitude(this.lon);
      point.setLatitude(this.lat);
      // this.mapService.savePoint(point);
    }
    );
  }

  onChangedValue(event) {
    this.idLegenda = event.value;
  }

}
