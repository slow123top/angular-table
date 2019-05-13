import { TestBed } from '@angular/core/testing';

import { CheckboxService } from './checkbox.service';

describe('CheckboxService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CheckboxService = TestBed.get(CheckboxService);
    expect(service).toBeTruthy();
  });
});
