import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

import { User } from 'src/app/model/user';
import { UserService } from '../user.service';
import { ModalService } from 'src/app/core/modal-popups.service';
import { Message } from 'src/app/model/message';
import { HttpResponse } from '@angular/common/http';
import { CommonService } from 'src/app/core/common.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {

  regForm: FormGroup;
  username: string;
  password: string;
  email: string;
  constructor(private fb: FormBuilder,
    private ref: MatDialogRef<RegistrationComponent>,
    private userService: UserService,
    private modalService: ModalService<User>, private commonService: CommonService) { }

  ngOnInit() {
    this.regForm = new FormGroup({
      'username' : new FormControl(null),
      'password': new FormControl(null),
      'email' : new FormControl(null),
    });
  }

  submit() {
    this.modalService.save(this.ref, this.regForm);
    this.ref.afterClosed().subscribe( (user: User) => {
      this.userService.registerUser(user).subscribe(
        (data: Message | any) =>
        (response: HttpResponse<any>) => this.commonService.unWrapErrorResponse(response)
      );
    }
    );
  }

}
