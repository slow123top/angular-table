import { TestBed } from '@angular/core/testing';

import { NpmLibService } from './npm-lib.service';

describe('NpmLibService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NpmLibService = TestBed.get(NpmLibService);
    expect(service).toBeTruthy();
  });
});
