import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { Observable} from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Result } from '../model/result';
import { Esito } from '../model/esito';
import { Role } from '../model/role';
import { map, filter, catchError, mergeMap} from 'rxjs/operators';
import { CommonService } from '../core/common.service';
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

  constructor(private http: HttpClient, private commonService: CommonService, private router: Router) { }

  registerUser(user: User): Observable<User> {
    return this.http.post<Result<User>>
    (this.endpoint + 'register', user, this.httpOptions).pipe(map(
      (result: Result<User>) => this.commonService.unWrapResult(result),
      )
      );
  }

  login(user: User): Observable<any> {
    return this.http.post(this.endpoint + 'login', user, {observe: 'response' as 'body'});
  }

  getUserRoles(): Observable<any> {
    return this.http.get<Result<Role>>(this.endpoint + 'roles').pipe(map(
      (result: Result<Role>) => this.commonService.unWrapResult(result)
    )
    );
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
