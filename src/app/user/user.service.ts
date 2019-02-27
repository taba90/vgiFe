import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Result } from '../model/result';
import { Esito } from '../model/esito';
import { Role } from '../model/role';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { CommonService } from '../core/common.service';


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
  constructor(private http: HttpClient, private commonService: CommonService) { }

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

  getUserRoles(): Observable<Result<Role>> {
    return this.http.get<Result<Role>>(this.endpoint + 'roles').pipe(map(
      (result: Result<Role>) => new Result<Role>(result)
    )
    );
  }

  isUserAdmin(): boolean {
    let isAdmin = false;
    this.getUserRoles().subscribe(
      (result) => {
        for (const r of result.getResults()) {
          if (r.roleName === 'ROLE_ADMIN') {
            isAdmin = true;
            return isAdmin;
          }
        }
      }
    );
    return isAdmin;
  }
}
