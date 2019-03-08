import { Component, OnInit, Inject } from '@angular/core';

import { Message } from '../model/message';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  message: Message;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data) {
    this.message = new Message(data.text, data.color);
   }

  ngOnInit() {
  }

  getColor() {
    return this.message.color;
  }





}
