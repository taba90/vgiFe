import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {


readonly utenteComponentRef = 'utente';
readonly legendaComponentRef = 'legenda';
readonly altroComponentRef = 'altro';

  constructor(private router: Router, private userService: UserService) {
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
  };
  }
  @ViewChild('sidenav')
  sideNav: MatSidenav;
  ngOnInit() {
  }

  toggleSideContent (componentRef: string) {
    this.sideNav.open();
    this.router.navigate(['/' + componentRef]);
  }

}
