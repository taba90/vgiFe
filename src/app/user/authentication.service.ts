import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login (username: string, password: string) {
     this.http.post<any>('/users/authenticate', new User()).subscribe(
       resp => {
         localStorage.setItem('aythToken', resp.headers.get(''));
       }
     );
  }

}
