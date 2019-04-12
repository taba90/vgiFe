import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { User } from 'src/app/model/user';
import { ModalService } from 'src/app/services/modal-popups.service';
import { MessageComponent } from 'src/app/message/message.component';
import { Message } from 'src/app/model/message';
import { Esito } from 'src/app/model/esito';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  token: string;
  inputMail: boolean;
  pwdResetForm: FormGroup;

  buttonName = 'Reset';

  constructor(private route: ActivatedRoute, private authService: AuthService,
    private fb: FormBuilder,
    private modalService: ModalService<User>,
    @Inject(MAT_DIALOG_DATA) public data) {
    this.token = this.data.t;
  }

  ngOnInit() {
    if (this.token === null || typeof this.token === 'undefined') {
      this.inputMail = true;
      this.pwdResetForm = this.fb.group({
        'email': ['', Validators.email],
      });
    } else {
      this.inputMail = false;
      this.buttonName = 'Aggiorna Password';
      this.pwdResetForm = this.fb.group({
        'password': ['', Validators.required],
      });
    }
  }

  submit() {
    if (this.token === null || typeof this.token === 'undefined') {
      if (this.pwdResetForm.invalid) {
        this.modalService.openMessageAlert(MessageComponent, new Message('Uno o più campi obbligatorio non sono stati riempiti',
          'red-snackbar'));
      } else {
        const email = this.pwdResetForm.get('email').value;
        this.authService.sendMailResetPassword(email).subscribe(
          (esito: Esito) => {
            if (esito.esito === true) {
              this.modalService.openMessageAlert(MessageComponent, new Message(esito.descrizione, 'green-snackbar'));
            }
          }
        );
      }
    } else {
      if (this.pwdResetForm.invalid) {
        this.modalService.openMessageAlert(MessageComponent, new Message('Uno o più campi obbligatorio non sono stati riempiti',
          'red-snackbar'));
      } else if (this.pwdResetForm.get('password') !== this.pwdResetForm.get('ripetiPassword')) {
        this.modalService.openMessageAlert(MessageComponent, new Message('Le password inserite non sono uguali. Inseriscile di nuovo'));
      }
      const password = this.pwdResetForm.get('password').value;
      const user: User = new User();
      user.password = password;
      this.authService.resetPassword(this.token, user);
    }
  }

}
