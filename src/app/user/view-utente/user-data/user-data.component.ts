import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { User } from 'src/app/model/user';
import { CommonService } from 'src/app/core/common.service';
import { HttpResponse } from '@angular/common/http';
import { Message } from 'src/app/model/message';
import { ModalService } from 'src/app/core/modal-popups.service';
import { MessageComponent } from 'src/app/message/message.component';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {

  thisUser: User;

  constructor(private userService: UserService, private commonService: CommonService,
    private modalService: ModalService<User>) { }

  ngOnInit() {
    this.userService.getSelf().subscribe(
      (user: User) => this.thisUser = user,
      (error: HttpResponse<any>) => this.commonService.unWrapErrorResponse(error)
    );
  }

  deleteSelf() {
    this.userService.deleteSelf().subscribe(
      (data: Message | any) => {
        if (data instanceof Message) {
          this.modalService.openMessageAlert(MessageComponent, data);
        }
        this.userService.logout();
      },
      (response: HttpResponse<any>) => this.commonService.unWrapErrorResponse(response)
    );
  }

}
