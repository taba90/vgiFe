import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/model/user';
import { PageEvent } from '@angular/material';
import { Esito } from 'src/app/model/esito';
import { Message } from 'src/app/model/message';
import { MessageComponent } from 'src/app/message/message.component';
import { ModalService } from 'src/app/services/modal-popups.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserListComponent implements OnInit {

  users: User[];

  usersNumber: number;

  currentPage: number;

  currentPageSize: number;

  constructor(private userService: UserService, private modalService: ModalService<User>) { }

  ngOnInit() {
    this.getUsersAndCount();
  }

  getUsersPagined (pageEvent: PageEvent) {
    this.userService.getUsersPagined(pageEvent.pageIndex, pageEvent.pageSize).subscribe(
      (users: User[]) => this.users = users
    );
  }

  onDelete(idUtente: number) {
    if (confirm('Si sta procedendo all\'eliminazione dell\'utente. Confermi l\'operazione?')) {
      this.userService.delete(idUtente).subscribe(
        (data: Esito) => {
          if (data.esito === true) {
            this.getUsersAndCount(this.currentPage, this.currentPageSize);
            this.modalService.openMessageAlert(MessageComponent, new Message(data.descrizione, 'green-snackbar'));
          }
        });
    }
  }

  getUsersAndCount (page?: number, resultPerPage?: number) {
    this.userService.getUsersPagined(page != null ? page : 0, resultPerPage != null ? resultPerPage : 5)
    .subscribe(
      (users: User[]) => this.users = users
    );
    this.userService.getCountUsers().subscribe(
      (usersNum: number) => this.usersNumber = usersNum
    );
  }

}
