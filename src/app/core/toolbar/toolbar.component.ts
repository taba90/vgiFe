import { Component, OnInit } from '@angular/core';
import { RegistrationComponent } from 'src/app/user/registration/registration.component';
import { LoginComponent } from 'src/app/user/login/login.component';
import { MatDialogConfig } from '@angular/material';
import { DialogService } from '../dialog.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(private dialogService: DialogService<User>) { }

  ngOnInit() {
  }

  openDialog(event: any) {
    const dialogName: string = event.srcElement.innerHTML;
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.position = {
        top : '0px',
        left : '0px' ,
      };
    if (dialogName === 'Registrazione') {
      this.dialogService.openDialog(RegistrationComponent, dialogConfig);
    } else if (dialogName === 'Login') {
      this.dialogService.openDialog(LoginComponent, dialogConfig);    }
  }

}
