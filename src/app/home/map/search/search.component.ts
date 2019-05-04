import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Legenda } from 'src/app/model/legenda';
import { MapService } from 'src/app/services/map.service';
import { LegendaService } from 'src/app/services/legenda.service';
import { VgiPoint } from 'src/app/model/point';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Search } from 'src/app/model/search';
import { ModalService } from 'src/app/services/modal-popups.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  legende: Legenda [];

  points: VgiPoint [];

  formSearch: FormGroup;

  @Output()
  searchCompleted: EventEmitter<any> = new EventEmitter();

  constructor(private fb: FormBuilder, private modalService: ModalService<Search>,
    private dialogRef: MatDialogRef<SearchComponent>,
    private mapService: MapService, private legendaService: LegendaService) { }

  ngOnInit() {
    this.createFormGroup();
    this.legendaService.getLegende().subscribe(
      (data: Legenda[]) => {
        this.legende = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  search () {
    this.modalService.save(this.dialogRef, this.formSearch);
    this.dialogRef.afterClosed().subscribe(
        (search: Search) => {
          this.mapService.searchLocations(search.annoDa, search.annoA, search.idLegenda).subscribe(
            (points: VgiPoint []) => {
              this.mapService.points = points;
              this.searchCompleted.emit();
            }
          );
        }
    );

  }

  createFormGroup () {
    this.formSearch = this.fb.group(
      {
        annoDa: [''],
        annoA: [''],
        idLegenda: [''],
      }
    );
  }

}
