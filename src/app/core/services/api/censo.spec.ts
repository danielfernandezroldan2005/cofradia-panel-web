import { TestBed } from '@angular/core/testing';

import { Censo } from './censo';

describe('Censo', () => {
  let service: Censo;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Censo);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
