import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Legenda } from 'src/app/model/legenda';
import { LegendaService } from '../legenda.service';
import { Result } from 'src/app/model/result';
import { CommonService } from 'src/app/core/common.service';
import { Message } from 'src/app/model/message';
import { MessageComponent } from 'src/app/message/message.component';
import { ModalService } from 'src/app/core/modal-popups.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-editlegenda',
  templateUrl: './editlegenda.component.html',
  styleUrls: ['./editlegenda.component.css']
})
export class EditLegendaComponent implements OnInit, OnChanges {


  private legendaForm: FormGroup;
  @Input()
  private legenda: Legenda;
  @Output()
  submitted = new EventEmitter();

  constructor(private formBuilder: FormBuilder, private legendaService: LegendaService,
    private commonService: CommonService, private modalService: ModalService<Legenda>) {}

  ngOnInit() {
    this.legendaForm = this.getForm();
    this.formBuilder.group(this.legendaForm);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.legendaForm = this.getForm();
  }

  onSubmit() {
    const legenda: Legenda = this.bindFormToLegenda();
    if (legenda.id != null) {
      this.legendaService.updateLegenda(legenda).subscribe(
        (result: Result<Legenda>) => {
          this.commonService.unWrapResult(result);
          this.submitted.emit();
        },
        (response: HttpResponse<any>) => this.commonService.unWrapErrorResponse(response)
      );
    } else {
      this.legendaService.saveLegenda(this.bindFormToLegenda()).subscribe(
        (data: Message | any) => {
          this.submitted.emit('submitted');
          if (data instanceof Message) {
            this.modalService.openMessageAlert(MessageComponent, data);
          }
        },
        (response: HttpResponse<any>) => this.commonService.unWrapErrorResponse(response)
      );
    }
  }


  bindFormToLegenda() {
    const codice: string = this.legendaForm.get('codice').value;
    const descrizione: string = this.legendaForm.get('descrizione').value;
    const colore: string = this.legendaForm.get('colore').value;
    const id: number = this.legendaForm.get('id').value;
    const legenda: Legenda = new Legenda();
    legenda.codice = codice;
    legenda.descrizione = descrizione;
    legenda.colore = colore;
    legenda.id = id;
    return legenda;
  }

  getForm (): FormGroup {
    let codice: string;
    let descrizione: string;
    let colore: string;
    let id: number;
    if (this.legenda != null) {
      codice = this.legenda.codice;
      descrizione = this.legenda.descrizione;
      colore = this.legenda.colore;
      id = this.legenda.id;
    } else {
      codice = '';
      descrizione = '';
      colore = '';
      id = null;
    }
    return new FormGroup({
      'codice': new FormControl(codice),
      'descrizione': new FormControl(descrizione),
      'colore': new FormControl(colore),
      'id': new FormControl(id)
    });

  }

}
