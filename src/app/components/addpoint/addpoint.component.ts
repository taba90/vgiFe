import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DialogService } from 'src/app/services/dialog.service';
import { VgiPoint } from 'src/app/model/point';
import Point from 'ol/geom/Point';
import Feature from 'ol/Feature';
import { Legenda } from 'src/app/model/legenda';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-addpoint',
  templateUrl: './addpoint.component.html',
  styleUrls: ['./addpoint.component.css'],
})
export class AddpointComponent implements OnInit {

  private form: FormGroup;

  private legende: Legenda[];

  constructor(private fb: FormBuilder,
    private mapService: MapService,
    private dialogRef: MatDialogRef<AddpointComponent>,
    private dialogService: DialogService,
    @Inject(MAT_DIALOG_DATA) private data) { }

  ngOnInit() {
    const feature: Feature = this.data;
    const point: Point = <Point> feature.getGeometry();
    const coor: [number, number] = point.getCoordinates();
    const vgiPoint: VgiPoint = new VgiPoint ();
    this.form = this.fb.group(vgiPoint);
  }

  esci() {
    this.mapService.getVectSource().clear();
    this.dialogService.close(this.dialogRef);
  }

}
