import { Component, OnInit, Inject } from '@angular/core';
import { DialogService } from '../core/dialog.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Message } from '../model/message';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  message: Message;

  constructor(@Inject(MAT_DIALOG_DATA) public data,
  private ref: MatDialogRef<MessageComponent>,
  private dialogService: DialogService<Message>) {
    this.message = data.message;
   }

  ngOnInit() {
    window.setTimeout(() => this.dialogService.close(this.ref), 1000);
  }

  getColor() {
    return this.message.color;
  }





}
