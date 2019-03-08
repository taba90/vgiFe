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
import { ModalService } from 'src/app/core/modal-popups.service';
import { CommonService } from 'src/app/core/common.service';
import { stringify } from '@angular/core/src/render3/util';

@Component({
  selector: 'app-addpoint',
  templateUrl: './addpoint.component.html',
  styleUrls: ['./addpoint.component.css'],
})
export class AddpointComponent implements OnInit {

  formPoint: FormGroup;

  pointAdded = new EventEmitter();

  selectedLegenda: number;

  legende: Legenda[];

  existingPoint: VgiPoint;

  modalName: string;

  isNew: boolean;

  constructor(private fb: FormBuilder,
    private mapService: MapService,
    private dialogRef: MatDialogRef<AddpointComponent>,
    private modalService: ModalService<VgiPoint>,
    private legendaService: LegendaService,
    private commonService: CommonService,
    @Inject(MAT_DIALOG_DATA) public data) {
      this.existingPoint = data.point;
      this.modalName = data.modalName;
      this.isNew = data.isNew;
    }

  ngOnInit() {
    // const point: Point = <Point> feature.getGeometry();
    // const coor: [number, number] = point.getCoordinates();
    // const vgiPoint: VgiPoint = new VgiPoint ();
    this.formPoint = this.bindPointToForm(this.existingPoint);
    this.legendaService.getLegende().subscribe(
      (data: Legenda[]) => {
        this.legende = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  salvaPosizione () {
    this.modalService.save(this.dialogRef, this.formPoint)
    .subscribe( (point: VgiPoint) => {
      point.latitude = this.existingPoint.latitude;
      point.longitude = this.existingPoint.longitude;
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

  aggiornaPosizione () {
    this.modalService.save(this.dialogRef, this.formPoint)
    .subscribe( (point: VgiPoint) => {
      point.latitude = this.existingPoint.latitude;
      point.longitude = this.existingPoint.longitude;
      const vgiPoint: VgiPoint = new VgiPoint(point);
      this.mapService.updatePoint(vgiPoint).subscribe(
        (result: VgiPoint | string) => {
          console.log(result);
          this.pointAdded.emit();
        },
        (error) => {
          const err: Esito = new Esito('002', 'Response erro' + error);
        },
      );
    }
    );
  }



  cancellaPosizione() {
    this.mapService.deleteLocationById(this.existingPoint.id).subscribe(
      (data: VgiPoint | Esito) => {
        this.modalService.close(this.dialogRef);
        this.pointAdded.emit();
      }
    );
  }

  bindPointToForm (point: VgiPoint): FormGroup {
    let descrizione: string;
    if (point.descrizione != null) {
      descrizione = point.descrizione;
    } else {
      descrizione = '';
    }
    if (point.legenda != null) {
      this.selectedLegenda = point.legenda.id;
      // idLegenda = point.legenda.id;
    }
    return new FormGroup({
      'descrizione': new FormControl(descrizione),
      'idLegenda': new FormControl(null),
    });
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
