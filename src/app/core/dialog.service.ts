import { Injectable, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { ComponentType } from '@angular/cdk/overlay/index';
import { Observable } from 'rxjs';
import { Message } from '../model/message';
import { MessageComponent } from '../message/message.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService <T> {

  private t: T;

  constructor(private dialog: MatDialog) { }

  openDialog(compName: ComponentType<any> | TemplateRef<any>, dialogConfig: MatDialogConfig): MatDialogRef<any> {
    return this.dialog.open(compName, dialogConfig);
  }

  openMessageAlert (componentRef:  ComponentType<any> | TemplateRef<any>, text: string, color: string) {
    const config: MatDialogConfig = this.getAlertConfig(text, color);
    this.openDialog(componentRef, config);
  }

  getAlertConfig (text: string, color: string): MatDialogConfig {
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      message : new Message(text , color)
    };
    dialogConfig.position = {
      top : '0px',
      left : '0px' ,
    };
    return dialogConfig;
  }

  save(dialogRef: MatDialogRef<any>, form: FormGroup): Observable<T> {
    dialogRef.close(form.value);
    return dialogRef.afterClosed();
  }

  close(dialogRef: MatDialogRef<any>) {
    dialogRef.close();
  }

  getT(): T {
    return this.t;
  }
  setT(t: T) {
    this.t = t;
  }
}
