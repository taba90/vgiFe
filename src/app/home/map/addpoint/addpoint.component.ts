import { Component, OnInit, Inject, EventEmitter, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VgiPoint } from 'src/app/model/point';
import { Legenda } from 'src/app/model/legenda';
import { Esito } from 'src/app/model/esito';
import { ModalService } from 'src/app/services/modal-popups.service';
import { CommonService } from 'src/app/services/common.service';
import { HttpResponse } from '@angular/common/http';
import { Message } from 'src/app/model/message';
import { MessageComponent } from 'src/app/message/message.component';
import { MapService } from 'src/app/services/map.service';
import { LegendaService } from 'src/app/services/legenda.service';

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
    this.bindPointToForm(this.existingPoint);
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
    if (this.formPoint.invalid) {
      this.modalService.openMessageAlert(MessageComponent, new Message('Uno o più campi obbligatorio non sono stati riempiti',
      'red-snackbar'));
      this.pointEvent.emit();
    } else {
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
              this.pointEvent.emit();
              if (data.esito === false) {
                this.modalService.openMessageAlert(MessageComponent, new Message(data.descrizione,
                  'red-snackbar'));
              }
            }
          );
        }
        );
    }
  }

  aggiornaPosizione() {
    if (this.formPoint.invalid) {
      this.modalService.openMessageAlert(MessageComponent, new Message('Uno o più campi obbligatorio non sono stati riempiti',
      'red-snackbar'));
      this.pointEvent.emit();
    } else {
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
                this.modalService.openMessageAlert(MessageComponent, new Message(data.descrizione,
                  'red-snackbar'));
              }
            },
          );
        }
        );
    }
  }



  cancellaPosizione() {
    if (confirm('Confermi la cancellazzione della localizzazione selezionata?')) {
      this.mapService.deleteLocationById(this.existingPoint.id).subscribe(
        (data: Esito) => {
          if (data.esito === true) {
            this.modalService.close(this.dialogRef);
            this.pointEvent.emit();
          } else {
            this.modalService.openMessageAlert(MessageComponent, new Message(data.descrizione,
              'red-snackbar'));
          }
        }
      );
    }
  }

  bindPointToForm(point: VgiPoint) {

    const descrizione: string = point.descrizione != null ? point.descrizione : '';
    const nome: string = point.nome != null ? point.nome : '';
    if (point.legenda != null) {
      this.selectedLegenda = point.legenda.id;
      // idLegenda = point.legenda.id;
    }
    this.formPoint = this.fb.group({
      descrizione: [descrizione],
      idLegenda: ['', Validators.required],
      nome: [nome]
    }
    );
  }

  closeModal() {
    this.modalService.close(this.dialogRef);
    this.pointEvent.emit();
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
