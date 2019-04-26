import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

@HostListener('window:beforeunload', ['$event'])
beforeUnloadHander(event) {
  localStorage.clear();
}
  constructor () {
  }


}
