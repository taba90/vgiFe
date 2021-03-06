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
  templateName: string;

  constructor(private route: ActivatedRoute, private authService: AuthService,
    private fb: FormBuilder,
    private modalService: ModalService<User>,
    private ref: MatDialogRef<PasswordResetComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
    this.token = this.data.t;
  }

  ngOnInit() {
    if (this.token === null || typeof this.token === 'undefined') {
      this.inputMail = true;
      this.templateName = 'Inserisci la tua email';
      this.pwdResetForm = this.fb.group({
        'email': ['', Validators.email],
      });
    } else {
      this.inputMail = false;
      this.buttonName = 'Aggiorna Password';
      this.templateName = 'Inserisci la tua nuova password';
      this.pwdResetForm = this.fb.group({
        'password': ['', Validators.required],
        'ripetiPassword' : ['', Validators.required]
      });
    }
  }

  submit() {
    if (this.token === null || typeof this.token === 'undefined') {
      if (this.pwdResetForm.invalid) {
        this.modalService.openMessageAlert(MessageComponent, new Message('Uno o più campi obbligatorio non sono stati riempiti',
          'red-snackbar'));
      } else {
        // const email = this.pwdResetForm.get('email').value;
        this.modalService.save(this.ref, this.pwdResetForm);
        this.ref.afterClosed().subscribe(
          (user: User) => this.authService.sendMailResetPassword(user.email).subscribe(
            (esito: Esito) => {
              if (esito.esito === true) {
                this.modalService.openMessageAlert(MessageComponent, new Message(esito.descrizione, 'green-snackbar'));
              }
            }
          )
        );
      }
    } else {
      if (this.pwdResetForm.invalid) {
        this.modalService.openMessageAlert(MessageComponent, new Message('Uno o più campi obbligatorio non sono stati riempiti',
          'red-snackbar'));
      } else if (this.pwdResetForm.get('password').value  !== this.pwdResetForm.get('ripetiPassword').value) {
        this.modalService.openMessageAlert(MessageComponent,
          new Message('Le password inserite non sono uguali. Inseriscile di nuovo', 'red-snackbar'));
      } else {
        this.modalService.save(this.ref, this.pwdResetForm).subscribe(
          (user: User) => this.authService.resetPassword(this.token, user).subscribe(
            (esito: Esito) => this.modalService.openMessageAlert(MessageComponent,
              new Message(esito.descrizione, 'green-snackbar'))
          )
        );
      }
    }
  }

}
