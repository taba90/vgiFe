import { Component, OnInit } from '@angular/core';
import { Legenda } from 'src/app/model/legenda';
import { LegendaService } from '../legenda.service';
import { Result } from 'src/app/model/result';
import { CommonService } from 'src/app/core/common.service';
import { DialogService } from 'src/app/core/dialog.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageComponent } from 'src/app/message/message.component';
import { Message } from 'src/app/model/message';

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
      (data: Legenda | Message) => {
        let message: Message;
        if (data instanceof Legenda) {
          message = new Message('Operazione completata', 'green');
        } else {
          message = data as Message;
        }
        this.dialogService.openMessageAlert(MessageComponent, message);
      },
      (response: HttpErrorResponse) => {
       const message: Message = this.commonService.unWrapErrorResponse(response);
       this.dialogService.openMessageAlert(MessageComponent, message);
      }
    );
  }

  getLegende() {
    this.legendaService.getLegende().subscribe(
      (data: Legenda [] | Message) => {
        if ( data instanceof Array) {
          this.legende = data;
        } else {
          this.dialogService.openMessageAlert(MessageComponent, data as Message );
        }
      },
      (response: HttpErrorResponse) => {
        const message: Message = this.commonService.unWrapErrorResponse(response);
        this.dialogService.openMessageAlert(MessageComponent, message);
      }
    );
  }

}
