import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Message } from '../model/message';
import { ModalService } from './modal-popups.service';
import { MessageComponent } from '../message/message.component';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  results: any[];
  result: any;

  constructor(private modalService: ModalService<any>) { }

  unWrapResult(result: any) {
    if (result.esito.codice === '000') {
      if (result.results != null) {
        return result.results;
      } else if (result.result != null) {
        return result.result;
      } else {
        return new Message(result.esito.descrizione, 'green');
      }
    } else {
      if (result.esito.codice === '001') {
          this.modalService.openMessageAlert(MessageComponent, new Message(result.esito.descrizione, 'orange'));
      } else {
          this.modalService.openMessageAlert(MessageComponent, new Message(result.esito.descrizione, 'red'));
      }
    }
  }

  unWrapErrorResponse(response: HttpResponse<any>) {
    let message: Message;
      if (response.status === 403 || response.status === 401) {
        const result: any = response.body as any;
          message = new Message (result.esito.descrizione, 'red');
      } else {
        message = new Message('Errore durante la chiamata. Servizio non disponibile' , 'red');
      }
      this.modalService.openMessageAlert(MessageComponent, message);
  }

  checkTokenExpired(response: HttpResponse<any>): boolean {
    if (response.headers.get('Ex-Token') !== null) {
      localStorage.remove('X-Vgi');
      this.modalService.openMessageAlert(MessageComponent, new Message('Sessione scaduta', 'red'));
      return false;
    } else {
      return true;
    }
  }

}
