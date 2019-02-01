import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from './material/material.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MapComponent } from './components/map/map.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { DialogService } from './services/dialog.service';
import { UserService } from './services/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddpointComponent } from './components/addpoint/addpoint.component';
import { EditLegendaComponent } from './editlegenda/editlegenda.component';
import { ListLegendaComponent } from './listlegenda/listlegenda.component';
import { MapService } from './services/map.service';

const appRoutes: Routes = [
  {path: 'map', component: MapComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'login', component: LoginComponent},
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
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
  ],
  entryComponents: [
    AddpointComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
