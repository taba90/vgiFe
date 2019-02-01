import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { UserService } from 'src/app/services/user.service';
import { DialogService } from 'src/app/services/dialog.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'src/app/model/user';
import { RegistrationComponent } from '../registration/registration.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  username: string;
  password: string;
  constructor(private fb: FormBuilder,
    private ref: MatDialogRef<LoginComponent>,
    private userService: UserService,
    private dialogService: DialogService) { }

  ngOnInit() {
    this.form = this.fb.group(new User('', '', ''));
  }

  submit() {
    this.dialogService.save(this.ref, this.form);
    this.ref.afterClosed().subscribe(data =>
      console.log(data)
    );
  }

  openModalReg () {
    this.dialogService.openDialog(RegistrationComponent);
    this.dialogService.close(this.ref);
  }



}
