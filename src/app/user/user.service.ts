import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Result } from '../model/result';
import { Esito } from '../model/esito';
import { Role } from '../model/role';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';


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
  constructor(private http: HttpClient) { }

  registerUser(user: User): Result<User> {
    const risultato: Result<User> = new Result<User>();
    this.http.post(this.endpoint + 'register', user, this.httpOptions)
    .subscribe(
      (result: Result<User>) => {
        risultato.setResult(result.result);
        risultato.setEsito(result.esito);
      },
      (error) => risultato.setEsito(new Esito ('002', error)),
    );
    return risultato;
  }

  login(user: User) {
    const risultato: Result<User> = new Result<User>();
    this.http.post(this.endpoint + 'login', user, {observe: 'response'})
    .subscribe (
      (response: HttpResponse<any>) => {
        console.log(response.headers);
        localStorage.setItem('X-Vgi', response.headers.get('X-Vgi'));
    },
      (error) => risultato.setEsito(new Esito ('002', error)),
    );
    // return risultato;
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
