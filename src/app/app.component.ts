import { Component, OnInit, HostListener } from '@angular/core';
import { UserService } from './user/user.service';
import { MapService } from './map/map.service';
import { ModalService } from './core/modal-popups.service';
import { LegendaService } from './legenda/legenda.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ModalService, UserService, MapService, LegendaService],
})
export class AppComponent {

@HostListener('window:beforeunload', ['$event'])
beforeUnloadHander(event) {
    if (localStorage.getItem('X-Vgi') !== null) {
      localStorage.removeItem('X-Vgi');
    }
}
  constructor () {
  }


}
