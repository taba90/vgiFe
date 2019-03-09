import { Component, OnInit, OnChanges, AfterViewInit, OnDestroy } from '@angular/core';
import { Legenda } from 'src/app/model/legenda';
import { LegendaService } from '../legenda.service';
import { Result } from 'src/app/model/result';
import { CommonService } from 'src/app/core/common.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { MessageComponent } from 'src/app/message/message.component';
import { Message } from 'src/app/model/message';
import { UserService } from 'src/app/user/user.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Role } from 'src/app/model/role';
import { ModalService } from 'src/app/core/modal-popups.service';

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
    private modalService: ModalService<MessageComponent>, private userService: UserService,
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
      (data: Message | any) => {
        if (data instanceof Message) {
          this.modalService.openMessageAlert(MessageComponent, data);
        }
      },
      (response: HttpResponse<Result<any>>) => {
       this.commonService.unWrapErrorResponse(response);
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
      (response: HttpResponse<Result<any>>) => {
        this.commonService.unWrapErrorResponse(response);
      }
    );
  }

}
