import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './services/interceptor.service';
import { MessageComponent } from './message/message.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AppSideRoutingModule } from './app-side-routing.module';
import { ToolbarComponent } from './home/toolbar/toolbar.component';
import { HomeComponent } from './home/home.component';
import { MapComponent } from './home/map/map.component';
import { AddpointComponent } from './home/map/addpoint/addpoint.component';
import { EditLegendaComponent } from './home/legenda/editlegenda/editlegenda.component';
import { ListLegendaComponent } from './home/legenda/listlegenda/listlegenda.component';
import { UserDataComponent } from './home/user-data/user-data.component';
import { RegistrationComponent } from './home/registration/registration.component';
import { LoginComponent } from './home/login/login.component';
import { UserListComponent} from './home/user-data/user-list/user.list.component';


@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    RegistrationComponent,
    LoginComponent,
    ToolbarComponent,
    AddpointComponent,
    EditLegendaComponent,
    ListLegendaComponent,
    HomeComponent,
    MessageComponent,
    UserDataComponent,
    UserListComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
  },
  AuthGuardService
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  entryComponents: [
    AddpointComponent,
    MessageComponent,
    RegistrationComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
