import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialogConfig } from '@angular/material';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { User } from 'src/app/model/user';
import { RegistrationComponent } from '../registration/registration.component';
import { UserService } from '../user.service';
import { DialogService } from 'src/app/core/dialog.service';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';

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
    private dialogService: DialogService<User>,
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
        (data: User | string) => {
          if (data instanceof User) {
            this.router.navigate(['/map']);
          }
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
