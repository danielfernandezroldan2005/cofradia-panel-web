import { TestBed } from '@angular/core/testing';

import { CensoService } from './censoService';

describe('CensoService', () => {
  let service: CensoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CensoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
