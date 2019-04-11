import { Component, OnInit } from '@angular/core';
import { MatDialogConfig } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/model/user';
import { RegistrationComponent } from '../registration/registration.component';
import { ModalService } from 'src/app/services/modal-popups.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Message } from 'src/app/model/message';
import { MessageComponent } from 'src/app/message/message.component';
import { HttpResponse } from '@angular/common/http';
import { Esito } from 'src/app/model/esito';
import { AuthService } from 'src/app/services/auth.service';
import { PasswordResetComponent } from '../password-reset/password-reset.component';
import { AppCostants } from 'src/app/app-costants';

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
    private modalService: ModalService<Message>,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.route.queryParams.subscribe(
      (params: Params) => {
        console.log(params);
        const token = params['t'];
        if (token !== null && typeof token !== 'undefined') {
          this.openModalPwdReset(token);
          // this.authService.resetPassword(token).subscribe();
        }
      }
    );

  }

  login() {
    if (this.loginForm.invalid) {
      this.modalService.openMessageAlert(MessageComponent, new Message('Uno o più campi obbligatorio non sono stati riempiti',
        'red-snackbar'));
    } else {
      const utente: User = this.bindFormToUser();
      this.authService.login(utente).subscribe(
        (response: HttpResponse<Esito>) => {
          const esito: Esito = response.body as Esito;
          if (esito.esito === true) {
            const token: string = response.headers.get(AppCostants.tokenName);
            if (token !== null) {
              localStorage.setItem(AppCostants.tokenName, token);
              this.authService.isLoggedIn = true;
              this.router.navigate(['/map']);
            }
          } else {
            this.modalService.openMessageAlert(MessageComponent, new Message(esito.descrizione, 'red-snackbar'));
          }
        });
    }
  }

  openModalReg() {
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.position = {
      top: '',
      bottom: '',
      left: '',
      right: '',
    };
    this.modalService.openDialog(RegistrationComponent, dialogConfig);
  }

  openModalPwdReset(t?: string) {
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.position = {
      top: '',
      bottom: '',
      left: '',
      right: '',
    };
    dialogConfig.data = {
      t: t
    };
    this.modalService.openDialog(PasswordResetComponent, dialogConfig);
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
