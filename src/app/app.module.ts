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
import { TabsComponent } from './core/tabs/tabs.component';
import { ToolbarComponent } from './core/toolbar/toolbar.component';
import { DialogComponent } from './dialog/dialog.component';
import { EditLegendaComponent } from './legenda/editlegenda/editlegenda.component';
import { ListLegendaComponent } from './legenda/listlegenda/listlegenda.component';
import { InterceptorService } from './user/interceptor.service';

const appRoutes: Routes = [
  {path: 'map', component: MapComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'login', component: LoginComponent},
  {path: 'addPoint', component: AddpointComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    TabsComponent,
    RegistrationComponent,
    LoginComponent,
    ToolbarComponent,
    DialogComponent,
    AddpointComponent,
    EditLegendaComponent,
    ListLegendaComponent,
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
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
  ],
  entryComponents: [
    AddpointComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
