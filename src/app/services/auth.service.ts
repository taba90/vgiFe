import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { Observable } from 'rxjs';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { Esito } from '../model/esito';
import {AppCostants} from '../app-costants';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;
  endpoint = environment.endpoint;
  constructor(private http: HttpClient, private router: Router) { }

  registerUser(user: User): Observable<User> {
    return this.http.post<User>( this.endpoint + '/register', user);
  }



  login(user: User): Observable<HttpResponse<Esito>> {
    return this.http.post<HttpResponse<Esito>>(this.endpoint  + '/login', user, { observe: 'response' as 'body' });
  }

  resetPassword(token: string, user: User): Observable<any> {
    return this.http.patch(this.endpoint  + '/resetPassword?t=' + token, user);
  }

  sendMailResetPassword(email: string): Observable<any> {
    return this.http.get(this.endpoint  + '/sendResetMail?email=' + email);
  }

  logout() {
    localStorage.clear();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }

  checkLogin() {
    if (localStorage.getItem('X-Vgi') !== null) {
      this.isLoggedIn = true;
      return true;
    } else {
      this.isLoggedIn = false;
      return false;
    }
  }

}
