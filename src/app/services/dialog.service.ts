import { Injectable, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { ComponentType } from '@angular/cdk/overlay/index';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openDialog(compName: ComponentType<any> | TemplateRef<any>, feature?: any, pixels?: [number, number]) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    this.dialog.open(compName, dialogConfig);
    if (feature != null) {
      dialogConfig.data = feature;
    }
      dialogConfig.position = {
        top : '0px',
        left : '0px' ,
      };

  }

  save(dialogRef: MatDialogRef<any>, form: FormGroup) {
    dialogRef.close(form.value);
  }

  close(dialogRef: MatDialogRef<any>) {
    dialogRef.close();
  }
}
