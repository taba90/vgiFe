import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { Observable } from 'rxjs';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { Esito } from '../model/esito';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;

  constructor(private http: HttpClient, private router: Router) { }

  registerUser(user: User): Observable<User> {
    return this.http.post<User>('http://localhost:8081/', user);
  }



  login(user: User): Observable<HttpResponse<Esito>> {
    return this.http.post<HttpResponse<Esito>>('http://localhost:8081/' + 'login', user, { observe: 'response' as 'body' });
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
