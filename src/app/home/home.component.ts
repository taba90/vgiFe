import { Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material';
import { SidenavService } from '../services/sidenav.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


readonly utenteComponentRef = 'utente';
readonly legendaComponentRef = 'legenda';
readonly altroComponentRef = 'altro';

  constructor(private router: Router, private sidenavService: SidenavService) {
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
  };
  }
  @ViewChild('sidenav')
  sidenav: MatSidenav;

  ngOnInit() {
    this.sidenavService.setMatSidenav(this.sidenav);
  }


}
