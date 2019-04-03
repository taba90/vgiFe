import { Injectable, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MatSnackBarRef } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { ComponentType } from '@angular/cdk/overlay/index';
import { Observable } from 'rxjs';
import { Message } from '../model/message';
import { MatSnackBar} from '@angular/material';
import { MessageComponent } from '../message/message.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService <T> {

  private t: T;

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar) { }

  openDialog(compName: ComponentType<any> | TemplateRef<any>, dialogConfig: MatDialogConfig): MatDialogRef<any> {
    return this.dialog.open(compName, dialogConfig);
  }

  openMessageAlert (componentRef:  ComponentType<any>, message: Message): MatSnackBarRef<MessageComponent> {
    let sText: string;
    let sCssClass: string;
    sText = message.testo;
    sCssClass = message.cssClass;
    return this.snackBar.openFromComponent(componentRef, {
      duration: 2000,
      verticalPosition: 'top',
      panelClass:  [sCssClass],
      data: {
        text: sText,
        color: 'white'
      }
    });
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
