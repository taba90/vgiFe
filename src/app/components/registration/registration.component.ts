import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { UserService } from 'src/app/services/user.service';
import { DialogService } from 'src/app/services/dialog.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {

  form: FormGroup;
  username: string;
  password: string;
  email: string;
  constructor(private fb: FormBuilder,
    private ref: MatDialogRef<RegistrationComponent>,
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
    this.userService.registerUser(this.username, this.password, this.email);
  }

}
