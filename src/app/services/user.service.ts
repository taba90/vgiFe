import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  registerUser (username: string, password: string, email: string) {
    const user: User = new User(username, password, email);
    console.log(user);
  }
}
