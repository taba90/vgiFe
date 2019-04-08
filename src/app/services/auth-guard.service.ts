import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, CanLoad, Route, UrlSegment } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanLoad {

  constructor(private authService: AuthService) { }

  canActivate (next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      return this.authService.checkLogin();
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean {
    return this.authService.checkLogin();
  }
}
