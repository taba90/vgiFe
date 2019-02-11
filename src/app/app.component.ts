import { Component, OnInit } from '@angular/core';
import { UserService } from './user/user.service';
import { MapService } from './map/map.service';
import { DialogService } from './core/dialog.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DialogService, UserService, MapService],
})
export class AppComponent {

  constructor () {
  }


}
