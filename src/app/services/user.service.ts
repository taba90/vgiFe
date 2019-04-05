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

  endpoint = 'http://localhost:8081/user/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };


  isAdmin: boolean;

  constructor(private http: HttpClient) { }

  getUserRoles(): Observable<any> {
    return this.http.get<Role[]>(this.endpoint + 'roles');
  }

  getUsersPagined(pagina: number, resultPerPage: number): Observable<any> {
    const pageParam = 'page=' + pagina;
    const resultParam = 'resultPerPage=' + resultPerPage;
    return this.http.get<User[]>(this.endpoint + 'all?' + pageParam + '&' + resultParam);
  }

  getCountUsers(): Observable<any> {
    return this.http.get<number>(this.endpoint + 'count');
  }


  getSelf(): Observable<User> {
    return this.http.get<User>(this.endpoint + 'self');
  }

  deleteSelf(): Observable<Esito> {
    return this.http.delete<Esito>(this.endpoint + 'self');
  }

  delete(idUser: number): Observable<Esito> {
    return this.http.delete<Esito>(this.endpoint + idUser);
  }

}
