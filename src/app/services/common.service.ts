import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Message } from '../model/message';
import { ModalService } from './modal-popups.service';
import { MessageComponent } from '../message/message.component';

@Injectable({
  providedIn: 'root'
})
export class CommonService {


  constructor(private modalService: ModalService<any>) { }


  checkTokenExpired(response: HttpResponse<any>): boolean {
    if (response.headers.get('Ex-Token') !== null) {
      localStorage.remove('X-Vgi');
      this.modalService.openMessageAlert(MessageComponent, new Message('Sessione scaduta', 'red-snackbar'));
      return false;
    } else {
      return true;
    }
  }

}
