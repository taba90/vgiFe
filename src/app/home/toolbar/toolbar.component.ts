import { Component, OnInit} from '@angular/core';
import { MatDialogConfig } from '@angular/material';
import { ModalService } from '../../services/modal-popups.service';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { Router} from '@angular/router';
import { RegistrationComponent } from '../registration/registration.component';
import { SidenavService } from 'src/app/services/sidenav.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {



  isLoggedIn = false;


  constructor(// private modalService: ModalService<User>,
    private userService: UserService, private sidenavService: SidenavService, private router: Router) { }

  ngOnInit() {

  }

  /*openDialog() {
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.position = {
        top : '0px',
        left : '0px' ,
      };
      this.modalService.openDialog(RegistrationComponent, dialogConfig);
  }*/

  showSideContent (componentRef: string) {
    this.sidenavService.openSidenav();
    this.router.navigate([{outlets: {'side': [componentRef]}}]);

  }

  checkLogin () {
    return this.userService.isLoggedIn;
  }
  logout () {
    this.userService.logout();
  }


}
