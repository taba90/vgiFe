import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { SidenavComponent } from './core/sidenav/sidenav.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { AddpointComponent } from './map/addpoint/addpoint.component';
import { ListLegendaComponent } from './legenda/listlegenda/listlegenda.component';
import { MapComponent } from './map/map.component';
import { AuthGuardService } from './core/auth-guard.service';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'home',
  component: SidenavComponent,
  canActivate: [AuthGuardService],
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      useHash: true,
      preloadingStrategy: PreloadAllModules
    }
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
