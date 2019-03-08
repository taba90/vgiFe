import { Component, OnInit } from '@angular/core';
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

  constructor () {
  }


}
