import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IstruzioniComponent } from './istruzioni.component';

describe('IstruzioniComponent', () => {
  let component: IstruzioniComponent;
  let fixture: ComponentFixture<IstruzioniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IstruzioniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IstruzioniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
