import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/model/user';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserListComponent implements OnInit {

  users: User[];

  usersNumber: number;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsersPagined(0).subscribe(
      (users: User[]) => this.users = users
    );
    this.userService.getCountUsers().subscribe(
      (usersNum: number) => this.usersNumber = usersNum
    );
  }

  getUsersPagined (pageEvent: PageEvent) {
    this.userService.getUsersPagined(pageEvent.pageIndex).subscribe(
      (users: User[]) => this.users = users
    );
  }

}
