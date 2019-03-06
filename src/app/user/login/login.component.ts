import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialogConfig } from '@angular/material';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { User } from 'src/app/model/user';
import { RegistrationComponent } from '../registration/registration.component';
import { UserService } from '../user.service';
import { DialogService } from 'src/app/core/dialog.service';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { Message } from 'src/app/model/message';
import { MessageComponent } from 'src/app/message/message.component';
import { HttpErrorResponse, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Result } from 'src/app/model/result';
import { CommonService } from 'src/app/core/common.service';

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
    // private ref: MatDialogRef<LoginComponent>,
    private userService: UserService,
    private dialogService: DialogService<Message>,
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
        (response) => {
          const token: string = response.headers.get('X-Vgi');
          if (token !== null) {
            localStorage.setItem('X-Vgi', token);
            this.userService.isLoggedIn = true;
            this.router.navigate(['/map']);
          } else {
            console.log(response);
          }
        },
        (error: HttpErrorResponse) => {
          if (error === null) {
            this.router.navigate(['/home/login']);
          }
          console.log(error);
          const message: Message = this.commonService.unWrapErrorResponse(error);
          this.dialogService.openMessageAlert(MessageComponent, message);
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
    this.dialogService.openDialog(RegistrationComponent, dialogConfig);
  }

  bindFormToUser() {
    const username: string = this.loginForm.get('username').value;
    const password: string = this.loginForm.get('password').value;
    const utente: User = new User();
    utente.setUsername(username);
    utente.setPassword(password);
    return utente;
  }



}
