import { Component, OnInit } from '@angular/core';
import { MatDialogConfig } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/model/user';
import { RegistrationComponent } from '../registration/registration.component';
import { UserService } from '../../services/user.service';
import { ModalService } from 'src/app/services/modal-popups.service';
import { Router } from '@angular/router';
import { Message } from 'src/app/model/message';
import { MessageComponent } from 'src/app/message/message.component';
import { HttpResponse} from '@angular/common/http';
import { Esito } from 'src/app/model/esito';

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
    private router: Router,
    ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.invalid) {
       this.modalService.openMessageAlert(MessageComponent, new Message('Uno o più campi obbligatorio non sono stati riempiti', 'red'));
    } else {
    const utente: User = this.bindFormToUser();
    this.userService.login(utente).subscribe(
      (response: HttpResponse<Esito>) => {
        const esito: Esito = response.body as Esito;
        if (esito.esito === true) {
          const token: string = response.headers.get('X-Vgi');
          if (token !== null) {
            localStorage.setItem('X-Vgi', token);
            this.userService.isLoggedIn = true;
            this.router.navigate(['/home']);
          }
        } else {
          this.modalService.openMessageAlert(MessageComponent, new Message(esito.descrizione, 'red'));
        }
      });
    }
  }

  openModalReg () {
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.position = {
        top : '',
        bottom: '',
        left : '' ,
        right: '',
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
