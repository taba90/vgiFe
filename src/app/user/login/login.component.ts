import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialogConfig } from '@angular/material';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { User } from 'src/app/model/user';
import { RegistrationComponent } from '../registration/registration.component';
import { UserService } from '../user.service';
import { ModalService } from 'src/app/core/modal-popups.service';
import { Router } from '@angular/router';
import { Message } from 'src/app/model/message';
import { MessageComponent } from 'src/app/message/message.component';
import { Result } from 'src/app/model/result';
import { CommonService } from 'src/app/core/common.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  username: string;
  password: string;
   constructor(private fb: FormBuilder,
    private userService: UserService,
    private modalService: ModalService<Message>,
    private commonService: CommonService,
    private router: Router,
    ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'username' : new FormControl(),
      'password': new FormControl(),
    });
  }

  login() {
    const utente: User = this.bindFormToUser();
      this.userService.login(utente).subscribe(
        (response: HttpResponse<Result<boolean>>) => {
          const token: string = response.headers.get('X-Vgi');
          if (token !== null) {
            localStorage.setItem('X-Vgi', token);
            this.userService.isLoggedIn = true;
            const result: Result<boolean> = response.body as Result<boolean>;
            this.commonService.unWrapResult(result);
            this.router.navigate(['/map']);
          } else {
            console.log(response);
          }
        },
        (error: HttpErrorResponse) => {
          this.router.navigate(['/login']);
          // this.commonService.unWrapErrorResponse(error);
        }
      );
  }

  openModalReg () {
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.position = {
        top : '0px',
        left : '0px' ,
      };
    this.modalService.openDialog(RegistrationComponent, dialogConfig);
  }

  bindFormToUser() {
    const username: string = this.loginForm.get('username').value;
    const password: string = this.loginForm.get('password').value;
    const utente: User = new User();
    utente.username = username;
    utente.password = password;
    return utente;
  }



}
