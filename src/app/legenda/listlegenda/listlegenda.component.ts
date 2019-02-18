import { Component, OnInit } from '@angular/core';
import { Legenda } from 'src/app/model/legenda';
import { LegendaService } from '../legenda.service';
import { Result } from 'src/app/model/result';

@Component({
  selector: 'app-listlegenda',
  templateUrl: './listlegenda.component.html',
  styleUrls: ['./listlegenda.component.css']
})
export class ListLegendaComponent implements OnInit {

  legende: Legenda[];
  constructor(private legendaService: LegendaService) { }

  ngOnInit() {
    this.legendaService.getLegende().subscribe(
      (data: Result<Legenda>) => this.legende = data.results,
    );
  }
  getColor(item: Legenda) {
    return item.colore;
  }

}
