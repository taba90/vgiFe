import { Component, OnInit} from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router} from '@angular/router';
import { SidenavService } from 'src/app/services/sidenav.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {



  isLoggedIn = false;


  constructor(// private modalService: ModalService<User>,
    private userService: UserService, private sidenavService: SidenavService,
    private router: Router, private authService: AuthService) { }

  ngOnInit() {

  }

  showSideContent (componentRef: string) {
    this.sidenavService.openSidenav();
    this.router.navigate([{outlets: {'side': [componentRef]}}]);

  }

  checkLogin () {
    return this.authService.isLoggedIn;
  }
  logout () {
    this.authService.logout();
  }


}
