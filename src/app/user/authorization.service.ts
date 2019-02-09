import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService implements CanActivate {

  constructor(private router: Router,
    private authenticationService: AuthenticationService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const currentUser = this.authenticationService;
      if (currentUser) {
          // check if route is restricted by role
          if (route.data.roles && route.data.roles.indexOf(currentUser) === -1) {
              // role not authorised so redirect to home page
              this.router.navigate(['/']);
              return false;
          }

          // authorised so return true
          return true;
      }

      // not logged in so redirect to login page with the return url
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
      return false;
  }
}
