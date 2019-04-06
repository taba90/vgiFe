import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditLegendaComponent } from './listlegenda/editlegenda/editlegenda.component';
import { ListLegendaComponent } from './listlegenda/listlegenda.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { MessageSharedModule } from 'src/app/message/message-shared.module';

@NgModule({
  declarations: [
    EditLegendaComponent,
    ListLegendaComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    MessageSharedModule
  ],
  exports: [

  ]
})
export class LegendaModule { }
