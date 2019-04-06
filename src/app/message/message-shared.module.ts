import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './message.component';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [
    MessageComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    MessageComponent,
  ],
  entryComponents: [
    MessageComponent
  ]
})
export class MessageSharedModule { }
