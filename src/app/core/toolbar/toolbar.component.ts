import { Component, OnInit, ViewChild, OnChanges, ContentChild, Input } from '@angular/core';
import { RegistrationComponent } from 'src/app/user/registration/registration.component';
import { LoginComponent } from 'src/app/user/login/login.component';
import { MatDialogConfig, MatSidenav } from '@angular/material';
import { ModalService } from '../modal-popups.service';
import { User } from 'src/app/model/user';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { UserService } from 'src/app/user/user.service';
import { Role } from 'src/app/model/role';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {


  @Input()
  sidenav: MatSidenav;
  isLoggedIn = false;
  constructor(private modalService: ModalService<User>, private userService: UserService, private router: Router) { }

  ngOnInit() {

  }

  openDialog() {
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.position = {
        top : '0px',
        left : '0px' ,
      };
      this.modalService.openDialog(RegistrationComponent, dialogConfig);
  }

  showSideContent (componentRef: string) {
    this.sidenav.toggle();
    this.router.navigate(['/home/' + componentRef]);
  }

  checkLogin () {
    return this.userService.isLoggedIn;
  }
  logout () {
    this.userService.logout();
  }


}
