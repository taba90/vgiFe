import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLegendaComponent } from './editlegenda.component';

describe('EditLegendaComponent', () => {
  let component: EditLegendaComponent;
  let fixture: ComponentFixture<EditLegendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLegendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLegendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
