import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './services/interceptor.service';
import { AuthGuardService } from './services/auth-guard.service';
import { ToolbarComponent } from './home/toolbar/toolbar.component';
import { HomeComponent } from './home/home.component';
import { UserModule } from './home/user/user.module';
import { LegendaModule } from './home/legenda/legenda.module';
import { LegendaService } from './services/legenda.service';
import { MapService } from './services/map.service';
import { ModalService } from './services/modal-popups.service';
import { UserService } from './services/user.service';
import { MapModule } from './home/map/map.module';
import { AuthModule } from './home/auth/auth.module';
import { AuthService } from './services/auth.service';


@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    AuthModule,
    MapModule,
    LegendaModule,
    UserModule,
    BrowserAnimationsModule,
    HttpClientModule,
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
  bootstrap: [AppComponent]
})
export class AppModule { }
