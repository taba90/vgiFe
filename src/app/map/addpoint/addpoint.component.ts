import { Component, OnInit, Inject, Input, EventEmitter, Output } from '@angular/core';
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
import { NumberValueAccessor } from '@angular/forms/src/directives';
import { DialogService } from 'src/app/core/dialog.service';
import { CommonService } from 'src/app/core/common.service';

@Component({
  selector: 'app-addpoint',
  templateUrl: './addpoint.component.html',
  styleUrls: ['./addpoint.component.css'],
})
export class AddpointComponent implements OnInit {

  private formPoint: FormGroup;

  pointAdded = new EventEmitter();

  legende: Legenda[];

  point: VgiPoint;

  constructor(private fb: FormBuilder,
    private mapService: MapService,
    private dialogRef: MatDialogRef<AddpointComponent>,
    private dialogService: DialogService<VgiPoint>,
    private legendaService: LegendaService,
    private commonService: CommonService,
    @Inject(MAT_DIALOG_DATA) public data) {
      this.point = data.point;
    }

  ngOnInit() {
    // const point: Point = <Point> feature.getGeometry();
    // const coor: [number, number] = point.getCoordinates();
    const vgiPoint: VgiPoint = new VgiPoint ();
    this.formPoint = new FormGroup({
      'descrizione': new FormControl(this.point.descrizione),
      'idLegenda': new FormControl(this.point.idLegenda),
    });
    this.legendaService.getLegende().subscribe(
      (data: Result<Legenda>) => {
        this.commonService.unWrapResult(data);
        this.legende = this.commonService.results as Legenda[];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  salvaPosizione () {
    this.dialogService.save(this.dialogRef, this.formPoint)
    .subscribe( (point: VgiPoint) => {
      point.latitude = this.point.latitude;
      point.longitude = this.point.longitude;
      const vgiPoint: VgiPoint = new VgiPoint(point);
      this.mapService.savePoint(vgiPoint, vgiPoint.getIdLegenda()).subscribe(
        (result: Result<VgiPoint>) => {
          this.commonService.unWrapResult(result);
          this.pointAdded.emit();
        },
        (error) => {
          const err: Esito = new Esito('002', 'Response erro' + error);
        },
      );
    }
    );
  }
  chiudi() {
    this.dialogService.close(this.dialogRef);
  }
 /* esci() {
    this.mapService.getVectSource().clear();
    this.dialogService.close(this.dialogRef);
    this.dialogRef.afterClosed().subscribe( (point: VgiPoint) => {
      point.setLongitude(this.lon);
      point.setLatitude(this.lat);
      // this.mapService.savePoint(point);
    }
    );
  }*/

}
