import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SidenavComponent } from './core/sidenav/sidenav.component';
import { AuthGuardService } from './core/auth-guard.service';
import { ListLegendaComponent } from './legenda/listlegenda/listlegenda.component';
import { UserDataComponent } from './user/view-utente/user-data/user-data.component';

const routes: Routes = [
  {path: 'home',
  component: SidenavComponent,
  canActivate: [AuthGuardService],
  children: [
    { path: 'legenda', component: ListLegendaComponent },
    { path: 'user', component: UserDataComponent }
  ]
},
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AppSideRoutingModule { }
