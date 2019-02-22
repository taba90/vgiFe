import { Component, OnInit } from '@angular/core';
import { Legenda } from 'src/app/model/legenda';
import { LegendaService } from '../legenda.service';
import { Result } from 'src/app/model/result';
import { CommonService } from 'src/app/core/common.service';

@Component({
  selector: 'app-listlegenda',
  templateUrl: './listlegenda.component.html',
  styleUrls: ['./listlegenda.component.css']
})
export class ListLegendaComponent implements OnInit {

  showForm = true;
  legende: Legenda[];
  legendaUp: Legenda;
  constructor(private legendaService: LegendaService, private commonService: CommonService) { }

  ngOnInit() {
    this.legendaService.getLegende().subscribe(
      (data: Result<Legenda>) => this.legende = data.results,
    );
  }
  getColor(item: Legenda) {
    return item.colore;
  }

  showLegendaForm(hide: boolean, legenda?: Legenda) {
    this.showForm = hide;
    if (legenda != null) {
      this.legendaUp = legenda;
    }
  }

  onDelete (idLegenda: number) {
    this.legendaService.deleteLegenda(idLegenda).subscribe(
      (data: Result<Legenda>) => {
        this.commonService.unWrapResult(data);
      }
    );
  }

}
