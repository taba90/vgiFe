import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialogConfig } from '@angular/material';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { User } from 'src/app/model/user';
import { RegistrationComponent } from '../registration/registration.component';
import { UserService } from '../user.service';
import { DialogService } from 'src/app/core/dialog.service';

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
    private ref: MatDialogRef<LoginComponent>,
    private userService: UserService,
    private dialogService: DialogService<User>) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'username' : new FormControl(),
      'password': new FormControl(),
    });
  }

  login() {
    this.dialogService.save(this.ref, this.loginForm)
    .subscribe((user: User) => {
      this.userService.login(user);
    });
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



}
