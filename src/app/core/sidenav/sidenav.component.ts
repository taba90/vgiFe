import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {


readonly utenteComponentRef = 'utente';
readonly legendaComponentRef = 'legenda';
readonly altroComponentRef = 'altro';

  constructor(private router: Router) { }
  @ViewChild('sidenav')
  sideNav: MatSidenav;
  @Output()
  sideNavEvent = new EventEmitter<MatSidenav>();
  ngOnInit() {
  }

  toggleSideContent (componentRef: string) {
    this.sideNav.toggle();
    this.router.navigate([componentRef]);
  }

}
