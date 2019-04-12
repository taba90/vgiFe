import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
import { ListLegendaComponent } from './home/legenda/listlegenda/listlegenda.component';
import { MapComponent } from './home/map/map.component';
import { LoginComponent } from './home/auth/login/login.component';
import { UserDataComponent } from './home/user/userdata/userdata.component';
import { PasswordResetComponent } from './home/auth/password-reset/password-reset.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'resetPassword', component: PasswordResetComponent },
  { path: 'map', component: MapComponent, canActivate: [AuthGuardService]},
  { path: 'legenda', component: ListLegendaComponent, canActivate: [AuthGuardService], outlet: 'side'},
  { path: 'user', component: UserDataComponent, canActivate: [AuthGuardService], outlet: 'side'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      preloadingStrategy: PreloadAllModules
    }
  )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
