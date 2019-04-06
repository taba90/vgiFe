import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDataComponent } from './userdata/userdata.component';
import { UserListComponent } from './userdata/userlist/userlist.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { MessageSharedModule } from 'src/app/message/message-shared.module';

@NgModule({
  declarations: [
    UserDataComponent,
    UserListComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    MessageSharedModule
  ]
})
export class UserModule { }
