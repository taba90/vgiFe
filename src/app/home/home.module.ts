import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterceptorService } from '../services/interceptor.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthGuardService } from '../services/auth-guard.service';
import { AuthService } from '../services/auth.service';
import { ModalService } from '../services/modal-popups.service';
import { UserService } from '../services/user.service';
import { MapService } from '../services/map.service';
import { LegendaService } from '../services/legenda.service';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { HomeComponent } from './home.component';
import { MaterialModule } from '../material.module';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [
    ToolbarComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
  ],
  exports: [
    AppRoutingModule,
    HomeComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
  },
  AuthGuardService,
  AuthService,
  ModalService,
  UserService,
  MapService,
  LegendaService
  ],
})
export class HomeModule { }
