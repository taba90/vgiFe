import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { Legenda } from 'src/app/model/legenda';
import { LegendaService } from '../../../services/legenda.service';
import { MessageComponent } from 'src/app/message/message.component';
import { Message } from 'src/app/model/message';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Role } from 'src/app/model/role';
import { ModalService } from 'src/app/services/modal-popups.service';
import { Esito } from 'src/app/model/esito';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-listlegenda',
  templateUrl: './listlegenda.component.html',
  styleUrls: ['./listlegenda.component.css']
})
export class ListLegendaComponent implements OnInit {

  isAuthorized: boolean;
  hide = true;
  legende: Legenda[];
  legendaUp: Legenda;
  childTemplateName: string;


  constructor(private legendaService: LegendaService,
    private modalService: ModalService<MessageComponent>, private userService: UserService,
    private authService: AuthService) {
  }

  ngOnInit() {
    if (this.authService.isLoggedIn) {
      this.getLegende();
      this.isAdmin();
    }
  }


  getColor(item: Legenda) {
    return item.colore;
  }

  hideLegendaForm(hide: boolean, isNew?: boolean, legenda?: Legenda) {
    this.hide = hide;
    if (legenda != null) {
      this.legendaUp = legenda;
    }
    if (hide === true) {
      this.getLegende();
    }
    if (isNew !== null && isNew === true) {
      this.legendaUp = null;
      this.childTemplateName = 'Nuovo campo legenda';
    } else if (isNew !== null && isNew === false) {
      this.childTemplateName = 'Modifica campo legenda';
    }
  }

  onDelete(idLegenda: number) {
    if (confirm('L\'elemento può essere cancellato solo se non esistono punti associati ad esso. Confermi l\'operazione?')) {
      this.legendaService.deleteLegenda(idLegenda).subscribe(
        (data: Esito) => {
          if (data.esito === true) {
            this.getLegende();
            this.modalService.openMessageAlert(MessageComponent, new Message(data.descrizione, 'green-snackbar'));
          }
        });
    }
  }

  getLegende() {
    this.legendaService.getLegende().subscribe(
      (data: Legenda[]) => {
        this.legende = data;
      },
    );
  }

  isAdmin() {
    this.userService.getUserRoles().subscribe(
      (roles: Role[]) => {
        for (const r of roles) {
          if (r.roleName === 'ROLE_ADMIN') {
            this.isAuthorized = true;
          } else {
            this.isAuthorized = false;
          }
        }
      }
    );
  }

}
