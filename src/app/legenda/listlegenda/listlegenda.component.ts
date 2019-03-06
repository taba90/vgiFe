import { Component, OnInit, OnChanges, AfterViewInit, OnDestroy } from '@angular/core';
import { Legenda } from 'src/app/model/legenda';
import { LegendaService } from '../legenda.service';
import { Result } from 'src/app/model/result';
import { CommonService } from 'src/app/core/common.service';
import { DialogService } from 'src/app/core/dialog.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageComponent } from 'src/app/message/message.component';
import { Message } from 'src/app/model/message';
import { UserService } from 'src/app/user/user.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Role } from 'src/app/model/role';

@Component({
  selector: 'app-listlegenda',
  templateUrl: './listlegenda.component.html',
  styleUrls: ['./listlegenda.component.css']
})
export class ListLegendaComponent implements OnInit, OnDestroy {

  isAuthorized = false;
  hide = true;
  legende: Legenda[];
  legendaUp: Legenda;
  constructor(private legendaService: LegendaService, private commonService: CommonService,
    private dialogService: DialogService<MessageComponent>, private userService: UserService,
     private route: ActivatedRoute) {
    }

  ngOnInit() {
    this.getLegende();
      this.userService.getUserRoles().subscribe(
        (roles: Role []) => {
          for ( const r of roles) {
            if (r.roleName === 'ROLE_ADMIN') {
              this.isAuthorized = true;
            }
          }
        }
      );
  }

  ngOnDestroy(): void {
    // nothing to do
  }

  getColor(item: Legenda) {
    return item.colore;
  }

  hideLegendaForm(hide: boolean, legenda?: Legenda) {
    this.hide = hide;
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
        }
      },
      (response: HttpErrorResponse) => {
        const message: Message = this.commonService.unWrapErrorResponse(response);
        this.dialogService.openMessageAlert(MessageComponent, message);
      }
    );
  }

}
