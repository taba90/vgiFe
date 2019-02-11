import { Injectable, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { ComponentType } from '@angular/cdk/overlay/index';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService <T> {

  private t: T;

  constructor(private dialog: MatDialog) { }

  openDialog(compName: ComponentType<any> | TemplateRef<any>, dialogConfig: MatDialogConfig): MatDialogRef<any> {
    return this.dialog.open(compName, dialogConfig);

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
