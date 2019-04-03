import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { Message } from 'src/app/model/message';
import { ModalService } from 'src/app/services/modal-popups.service';
import { MessageComponent } from 'src/app/message/message.component';
import { Esito } from 'src/app/model/esito';
import { UserService } from 'src/app/services/user.service';
import { SidenavService } from 'src/app/services/sidenav.service';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {

  thisUser: User;
  formReady: boolean;

  constructor(private userService: UserService, private sidenavService: SidenavService,
    private modalService: ModalService<User>) { }

  ngOnInit() {
    this.userService.getSelf().subscribe(
      (user: User) => {
        this.thisUser = user;
        this.formReady = true;
      }
    );
  }

  deleteSelf() {
    if (confirm('Confermi di voler procedere all\'autocancellazione del tuo account? L\'operazione è irreversibile')) {
      this.formReady = false;
      this.sidenavService.closeSidenav();
      this.userService.deleteSelf().subscribe(
        (data: Esito) => {
          if (data.esito === true) {
            this.modalService.openMessageAlert(MessageComponent, new Message(data.descrizione,
              'green-snackbar'));
            this.userService.logout();
          } else {
            this.formReady = true;
            this.modalService.openMessageAlert(MessageComponent, new Message(data.descrizione,
              'red-snackbar'));
          }
        },
      );
    }
  }

}
