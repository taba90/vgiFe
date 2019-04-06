import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Legenda } from 'src/app/model/legenda';
import { Message } from 'src/app/model/message';
import { MessageComponent } from 'src/app/message/message.component';
import { ModalService } from 'src/app/services/modal-popups.service';
import { LegendaService } from 'src/app/services/legenda.service';

@Component({
  selector: 'app-editlegenda',
  templateUrl: './editlegenda.component.html',
  styleUrls: ['./editlegenda.component.css']
})
export class EditLegendaComponent implements OnInit, OnChanges {


  legendaForm: FormGroup;

  @Input()
  legenda: Legenda;

  @Input()
  templateName: string;

  @Output()
  submitted = new EventEmitter();
  @Output()
  close = new EventEmitter();

  constructor(private formBuilder: FormBuilder, private legendaService: LegendaService,
    private modalService: ModalService<Legenda>) {}

  ngOnInit() {
    this.populateForm();
    this.formBuilder.group(this.legendaForm);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.populateForm();
  }

  onSubmit() {
    if (this.legendaForm.invalid) {
        this.modalService.openMessageAlert(MessageComponent, new Message('Uno o più campi obbligatorio non sono stati riempiti',
         'red-snackbar'));
    } else {
      const legenda: Legenda = this.bindFormToLegenda();
    if (legenda.id != null) {
      this.legendaService.updateLegenda(legenda).subscribe(
        (result: Legenda) => {
          this.submitted.emit();
          this.modalService.openMessageAlert(MessageComponent, new Message('Operazione eseguita con successo',
          'green-snackbar'));
        },
      );
    } else {
      this.legendaService.saveLegenda(this.bindFormToLegenda()).subscribe(
        (data: Legenda) => {
          if (data != null) {
          this.submitted.emit('submitted');
          this.modalService.openMessageAlert(MessageComponent, new Message('Operazione eseguita con successo',
          'green-snackbar'));
          }
        },
      );
    }
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

  populateForm () {
    const codice: string = this.legenda != null && this.legenda.codice != null ? this.legenda.codice : '';
    const descrizione: string = this.legenda != null && this.legenda.descrizione != null ? this.legenda.descrizione : '';
    const colore: string = this.legenda != null && this.legenda.colore != null ? this.legenda.colore : '';
    const idLegenda: number = this.legenda != null && this.legenda.id != null ? this.legenda.id : null;
    this.legendaForm = this.formBuilder.group({
      codice: [codice, Validators.required],
      descrizione: [descrizione, Validators.required],
      colore: [colore, Validators.required],
      id: [idLegenda]
    }
    );
  }

  chiudi() {
    this.close.emit();
  }
}
