import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLegendaComponent } from './listlegenda.component';

describe('List.LegendaComponent', () => {
  let component: ListLegendaComponent;
  let fixture: ComponentFixture<ListLegendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListLegendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLegendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
