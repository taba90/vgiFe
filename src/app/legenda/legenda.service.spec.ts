import { TestBed } from '@angular/core/testing';

import { LegendaService } from './legenda.service';

describe('LegendaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LegendaService = TestBed.get(LegendaService);
    expect(service).toBeTruthy();
  });
});
