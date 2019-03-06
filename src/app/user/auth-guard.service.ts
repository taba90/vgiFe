import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from './user.service';
import { map, filter, catchError, mergeMap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private userService: UserService) { }

  canActivate (next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      return this.userService.checkLogin();
  }
}
