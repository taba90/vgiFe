import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  private componentRef: string;
  private utenteComponentRef = 'Utente';
  private legendaComponentRef = 'Legenda';
  private altroComponentRef = 'Altro';
  constructor(private route: ActivatedRoute) { }
  @ViewChild('sidenav')
  sideNav: MatSidenav;
  @Output()
  sideNavEvent = new EventEmitter<MatSidenav>();
  ngOnInit() {
    this.sideNavEvent.emit(this.sideNav);
        this.route.params.subscribe(
      params => this.componentRef = params['compRef'],
    );
  }

  toggleSideContent (componentRef: string) {
    this.componentRef = componentRef;
    this.sideNav.toggle();
  }

}
