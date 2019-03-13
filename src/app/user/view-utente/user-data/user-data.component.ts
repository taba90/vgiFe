import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { User } from 'src/app/model/user';
import { CommonService } from 'src/app/core/common.service';
import { HttpResponse } from '@angular/common/http';
import { Message } from 'src/app/model/message';
import { ModalService } from 'src/app/core/modal-popups.service';
import { MessageComponent } from 'src/app/message/message.component';
import { Esito } from 'src/app/model/esito';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {

  thisUser: User;
  formReady: boolean;

  constructor(private userService: UserService, private commonService: CommonService,
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
    this.formReady = false;
    this.userService.deleteSelf().subscribe(
      (data: Esito) => {
        if (data.esito === true) {
          this.modalService.openMessageAlert(MessageComponent, new Message(data.descrizione, 'green'));
          this.userService.logout();
        } else {
          this.formReady = true;
          this.modalService.openMessageAlert(MessageComponent, new Message(data.descrizione, 'red'));
        }
      },
    );
  }

}
