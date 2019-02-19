import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SidenavComponent } from './core/sidenav/sidenav.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { AddpointComponent } from './map/addpoint/addpoint.component';
import { ListLegendaComponent } from './legenda/listlegenda/listlegenda.component';
import { MapComponent } from './map/map.component';

const routes: Routes = [
  // {path: 'map', component: MapComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'Login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
