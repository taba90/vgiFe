import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { Observable} from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Esito } from '../model/esito';
import { Role } from '../model/role';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  endpoint = 'http://localhost:8081/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  isLoggedIn = false;

  isAdmin = false;

  constructor(private http: HttpClient, private router: Router) { }

  registerUser(user: User): Observable<User> {
    return this.http.post<User>(this.endpoint + 'register', user, this.httpOptions);
  }

  login(user: User): Observable<HttpResponse<Esito>> {
    return this.http.post<HttpResponse<Esito>>(this.endpoint + 'login', user, {observe: 'response' as 'body'});
  }

  getUserRoles(): Observable<any> {
    return this.http.get<Role[]>(this.endpoint + 'roles');
  }

  isUserAdmin(): Observable<boolean> {
    this.getUserRoles().pipe(map(
      (roles) => {
        for (const role of roles as Role []) {
          if (role.roleName === 'ROLE_ADMIN') {
            this.isAdmin = true;
          }
        }
      }
    )
    );
    return Observable.create(this.isAdmin);
  }

  getSelf(): Observable<User> {
    return this.http.get<User>(this.endpoint + 'self');
  }

  deleteSelf(): Observable<Esito> {
    return this.http.delete<Esito>(this.endpoint + 'self');
  }

  logout() {
    localStorage.removeItem('X-Vgi');
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
    /*this.getUserRoles().pipe(map(
      (roles: Role []) => {
        for (const r of roles) {
          if (r.roleName === 'ROLE_ADMIN') {
            this.isAdmin = true;
          }
        }
        return this.isAdmin;
      }
    )
    );
    return Observable.of(this.isAdmin);
  }*/

  checkLogin () {
    if (localStorage.getItem('X-Vgi') !== null) {
      this.isLoggedIn = true;
      return true;
    } else {
      this.isLoggedIn = false;
      return false;
    }
  }
}
