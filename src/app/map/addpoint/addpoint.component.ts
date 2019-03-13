import { Component, OnInit, Inject, EventEmitter, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { VgiPoint } from 'src/app/model/point';
import { Legenda } from 'src/app/model/legenda';
import { LegendaService } from 'src/app/legenda/legenda.service';
import { Esito } from 'src/app/model/esito';
import { MapService } from '../map.service';
import { ModalService } from 'src/app/core/modal-popups.service';
import { CommonService } from 'src/app/core/common.service';
import { HttpResponse } from '@angular/common/http';
import { Message } from 'src/app/model/message';
import { MessageComponent } from 'src/app/message/message.component';

@Component({
  selector: 'app-addpoint',
  templateUrl: './addpoint.component.html',
  styleUrls: ['./addpoint.component.css'],
})
export class AddpointComponent implements OnInit {

  formPoint: FormGroup;

  @Output()
  pointEvent: EventEmitter<any> = new EventEmitter();

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

  salvaPosizione() {
    this.modalService.save(this.dialogRef, this.formPoint)
      .subscribe((point: VgiPoint) => {
        point.latitude = this.existingPoint.latitude;
        point.longitude = this.existingPoint.longitude;
        point.location = this.existingPoint.location;
        const legenda: Legenda = new Legenda();
        legenda.id = point.idLegenda;
        point.legenda = legenda;
        this.mapService.savePoint(point).subscribe(
          (data: Esito) => {
            if (data.esito === true) {
                this.pointEvent.emit();
            } else {
              this.modalService.openMessageAlert(MessageComponent, new Message(data.descrizione, 'red'));
            }
          }
        );
      }
      );
  }

  aggiornaPosizione() {
    this.modalService.save(this.dialogRef, this.formPoint)
      .subscribe((point: VgiPoint) => {
        point.latitude = this.existingPoint.latitude;
        point.longitude = this.existingPoint.longitude;
        point.id = this.existingPoint.id;
        const legenda: Legenda = new Legenda();
        legenda.id = point.idLegenda;
        point.legenda = legenda;
        this.mapService.updatePoint(point).subscribe(
          (data: Esito) => {
            console.log(data);
            if (data.esito === true) {
              this.pointEvent.emit();
            } else {
              this.modalService.openMessageAlert(MessageComponent, new Message(data.descrizione, 'red'));
            }
          },
        );
      }
      );
  }



  cancellaPosizione() {
    this.mapService.deleteLocationById(this.existingPoint.id).subscribe(
      (data: Esito) => {
        if (data.esito === true) {
          this.modalService.close(this.dialogRef);
          this.pointEvent.emit();
        } else {
          this.modalService.openMessageAlert(MessageComponent, new Message(data.descrizione, 'red'));
        }
      },
      (response: HttpResponse<any>) => this.commonService.unWrapErrorResponse(response)
    );
  }

  bindPointToForm(point: VgiPoint): FormGroup {
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
