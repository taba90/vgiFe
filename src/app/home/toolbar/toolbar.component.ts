import { Component, OnInit, Input } from '@angular/core';
import { MatDialogConfig, MatSidenav } from '@angular/material';
import { ModalService } from '../../services/modal-popups.service';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { Router} from '@angular/router';
import { RegistrationComponent } from '../registration/registration.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {


  @Input()
  sidenav: MatSidenav;
  isLoggedIn = false;
  constructor(private modalService: ModalService<User>,
    private userService: UserService, private router: Router) { }

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
    this.router.navigate([{outlets: {'side': [componentRef]}}]);

  }

  checkLogin () {
    return this.userService.isLoggedIn;
  }
  logout () {
    this.userService.logout();
  }


}
