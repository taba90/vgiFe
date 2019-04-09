import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { UserModule } from './home/user/user.module';
import { LegendaModule } from './home/legenda/legenda.module';
import { MapModule } from './home/map/map.module';
import { AuthModule } from './home/auth/auth.module';
import { HomeModule } from './home/home.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HomeModule,
    MaterialModule,
    AuthModule,
    MapModule,
    LegendaModule,
    UserModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
