import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-editlegenda',
  templateUrl: './editlegenda.component.html',
  styleUrls: ['./editlegenda.component.css']
})
export class EditLegendaComponent implements OnInit {


  private legendaForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.legendaForm = new FormGroup({
      'codice': new FormControl(null),
      'descrizione': new FormControl(null),
      'colore': new FormControl(null),
    });
  }

}
