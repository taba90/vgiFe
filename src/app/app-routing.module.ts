import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
import { ListLegendaComponent } from './home/legenda/listlegenda/listlegenda.component';
import { UserDataComponent } from './home/user-data/user-data.component';
import { MapComponent } from './home/map/map.component';
import { LoginComponent } from './home/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'map', component: MapComponent, canActivate: [AuthGuardService]},
  { path: 'legenda', component: ListLegendaComponent, canActivate: [AuthGuardService], outlet: 'side'},
  { path: 'user', component: UserDataComponent, canActivate: [AuthGuardService], outlet: 'side'},
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
