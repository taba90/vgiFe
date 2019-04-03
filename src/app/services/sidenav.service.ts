import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  private sidenav: MatSidenav;

  constructor() { }

  openSidenav () {
    this.sidenav.open();
  }

  closeSidenav () {
    this.sidenav.close();
  }

  toggleSidenav () {
    this.sidenav.toggle();
  }

  getMatSidenav(): MatSidenav {
    return this.sidenav;
  }

  setMatSidenav(sidenav: MatSidenav) {
    this.sidenav = sidenav;
  }
}
