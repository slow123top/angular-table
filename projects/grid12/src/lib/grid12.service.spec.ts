import { TestBed } from '@angular/core/testing';

import { Grid12Service } from './grid12.service';

describe('Grid12Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Grid12Service = TestBed.get(Grid12Service);
    expect(service).toBeTruthy();
  });
});
