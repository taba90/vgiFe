import { Component, OnInit } from '@angular/core';
import { DialogService } from './services/dialog.service';
import { UserService } from './services/user.service';
import { MapService } from './services/map.service';

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
