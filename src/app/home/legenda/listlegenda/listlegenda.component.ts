import { Component, OnInit, OnDestroy } from '@angular/core';
import { Legenda } from 'src/app/model/legenda';
import { LegendaService } from '../../../services/legenda.service';
import { MessageComponent } from 'src/app/message/message.component';
import { Message } from 'src/app/model/message';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute} from '@angular/router';
import { Role } from 'src/app/model/role';
import { ModalService } from 'src/app/services/modal-popups.service';
import { Esito } from 'src/app/model/esito';

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
  constructor(private legendaService: LegendaService,
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
    if (confirm('L\'elemento può essere cancellato solo se non esistono punti associati ad esso. Confermi l\'operazione?')) {
      this.legendaService.deleteLegenda(idLegenda).subscribe(
        (data: Esito) => {
          this.modalService.openMessageAlert(MessageComponent, new Message(data.descrizione, 'green'));
        });
    }
  }

  getLegende() {
    this.legendaService.getLegende().subscribe(
      (data: Legenda []) => {
        this.legende = data;
      },
    );
  }

}
