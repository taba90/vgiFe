import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from './material/material.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MapComponent } from './map/map.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { AddpointComponent } from './map/addpoint/addpoint.component';
import { ToolbarComponent } from './core/toolbar/toolbar.component';
import { EditLegendaComponent } from './legenda/editlegenda/editlegenda.component';
import { ListLegendaComponent } from './legenda/listlegenda/listlegenda.component';
import { InterceptorService } from './user/interceptor.service';
import { SidenavComponent } from './core/sidenav/sidenav.component';
import { MessageComponent } from './message/message.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'map', component: MapComponent},
  {path: 'legenda', component: ListLegendaComponent, outlet: 'side-route'},
];

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
    SidenavComponent,
    MessageComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
  },
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  entryComponents: [
    AddpointComponent,
    MessageComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
