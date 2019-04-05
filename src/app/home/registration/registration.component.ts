import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

import { User } from 'src/app/model/user';
import { ModalService } from 'src/app/services/modal-popups.service';
import { Message } from 'src/app/model/message';
import { MessageComponent } from 'src/app/message/message.component';
import { Esito } from 'src/app/model/esito';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {

  regForm: FormGroup;
  constructor(private fb: FormBuilder,
    private ref: MatDialogRef<RegistrationComponent>,
    private authService: AuthService,
    private modalService: ModalService<User>) { }

  ngOnInit() {
    this.regForm = this.fb.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required],
      'email': ['', Validators.email],
      'anni': ['', Validators.required],
    });
  }

  submit() {
    if (this.regForm.invalid) {
      this.modalService.openMessageAlert(MessageComponent, new Message('Uno o più campi obbligatorio non sono stati riempiti',
      'red-snackbar'));
    } else {
      this.modalService.save(this.ref, this.regForm);
      this.ref.afterClosed().subscribe((user: User) => {
      this.authService.registerUser(user).subscribe(
        (data: Esito | any) => this.modalService.openMessageAlert(MessageComponent,
          new Message(data.descrizione, 'green-snackbar'))
      );
    }
    );
    }
  }

  /*checkInvalidControls (): string [] {
    const result: string [] = [];
      for (const name of this.regForm.controls {
        if (name.invalid) {
          result.push(name);
        }
      }
      return controls;
  }*/

}
