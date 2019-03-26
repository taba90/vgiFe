import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
import { HomeComponent } from './home/home.component';
import { ListLegendaComponent } from './home/legenda/listlegenda/listlegenda.component';
import { UserDataComponent } from './home/user-data/user-data.component';

const routes: Routes = [
  {path: 'home',
  component: HomeComponent,
  canActivate: [AuthGuardService],

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
