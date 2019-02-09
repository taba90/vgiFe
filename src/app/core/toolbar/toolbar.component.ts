import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/app/dialog/dialog.service';
import { RegistrationComponent } from 'src/app/user/registration/registration.component';
import { LoginComponent } from 'src/app/user/login/login.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(private dialogService: DialogService) { }

  ngOnInit() {
  }

  openDialog(event: any) {
    const dialogName: string = event.srcElement.innerHTML;
    if (dialogName === 'Registrazione') {
      this.dialogService.openDialog(RegistrationComponent);
    } else if (dialogName === 'Login') {
      this.dialogService.openDialog(LoginComponent);    }
  }

}
