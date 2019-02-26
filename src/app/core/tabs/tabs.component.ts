import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {

  links = [{name: 'Login', value: 'login'}, {name: 'Map', value: 'map'}];
  activeLink = this.links[0].value;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigate(route: string) {
    this.router.navigate(['/' + route]);
  }

}
