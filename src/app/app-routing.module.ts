import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ListLegendaComponent } from './home/legenda/listlegenda/listlegenda.component';
import { UserDataComponent } from './home/user-data/user-data.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'home',
  component: HomeComponent,
  canActivate: [AuthGuardService],
  children: [
    { path: 'legenda', component: ListLegendaComponent },
    { path: 'user', component: UserDataComponent }
  ]
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
