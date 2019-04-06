import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddpointComponent } from './addpoint/addpoint.component';
import { MapComponent } from './map.component';
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageSharedModule } from 'src/app/message/message-shared.module';

@NgModule({
  declarations: [
    MapComponent,
    AddpointComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    MessageSharedModule
  ],
  entryComponents: [
    AddpointComponent,
  ],
})
export class MapModule { }
