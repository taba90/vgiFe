import { Component, OnInit, HostListener } from '@angular/core';
import { UserService } from './services/user.service';
import { MapService } from './services/map.service';
import { ModalService } from './services/modal-popups.service';
import { LegendaService } from './services/legenda.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ModalService, UserService, MapService, LegendaService],
})
export class AppComponent {

// @HostListener('window:beforeunload', ['$event'])
beforeUnloadHander(event) {
    if (localStorage.getItem('X-Vgi') !== null) {
      localStorage.removeItem('X-Vgi');
    }
}
  constructor () {
  }


}
