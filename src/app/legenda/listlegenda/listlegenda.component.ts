import { Component, OnInit } from '@angular/core';
import { Legenda } from 'src/app/model/legenda';
import { LegendaService } from '../legenda.service';
import { Result } from 'src/app/model/result';
import { CommonService } from 'src/app/core/common.service';
import { DialogService } from 'src/app/core/dialog.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageComponent } from 'src/app/message/message.component';

@Component({
  selector: 'app-listlegenda',
  templateUrl: './listlegenda.component.html',
  styleUrls: ['./listlegenda.component.css']
})
export class ListLegendaComponent implements OnInit {

  showForm = true;
  legende: Legenda[];
  legendaUp: Legenda;
  constructor(private legendaService: LegendaService, private commonService: CommonService,
    private dialogService: DialogService<MessageComponent>) { }

  ngOnInit() {
    this.getLegende();
  }
  getColor(item: Legenda) {
    return item.colore;
  }

  hideLegendaForm(hide: boolean, legenda?: Legenda) {
    this.showForm = hide;
    if (legenda != null) {
      this.legendaUp = legenda;
    }
    if (hide === true) {
      this.getLegende();
    }
  }

  onDelete (idLegenda: number) {
    this.legendaService.deleteLegenda(idLegenda).subscribe(
      (data: Result<Legenda>) => {
        this.commonService.unWrapResult(data);
      }
    );
  }

  getLegende() {
    this.legendaService.getLegende().subscribe(
      (legende: Legenda []) => this.legende = legende,
      (response: HttpErrorResponse) => {
        const text: string = this.commonService.unWrapErrorResponse(response);
        this.dialogService.openMessageAlert(MessageComponent, 'text', 'orange');
      }
    );
  }

}
