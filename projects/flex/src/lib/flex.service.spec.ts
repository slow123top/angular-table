import { TestBed } from '@angular/core/testing';

import { FlexService } from './flex.service';

describe('FlexService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FlexService = TestBed.get(FlexService);
    expect(service).toBeTruthy();
  });
});
