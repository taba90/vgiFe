import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

import { User } from 'src/app/model/user';
import { UserService } from '../user.service';
import { DialogService } from 'src/app/core/dialog.service';

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
    private dialogService: DialogService<User>) { }

  ngOnInit() {
    this.regForm = new FormGroup({
      'username' : new FormControl(null),
      'password': new FormControl(null),
      'email' : new FormControl(null),
    });
  }

  submit() {
    this.dialogService.save(this.ref, this.regForm);
    this.ref.afterClosed().subscribe( (user: User) => {
      this.userService.registerUser(user).subscribe(
        (utente: User) => console.log(user),
        (response: Response) => {
          if (response.status === 403) {
            localStorage.removeItem('X-Vgi');
          }
        },
      );
    }
    );
  }

}
