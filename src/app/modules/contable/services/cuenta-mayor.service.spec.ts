import { TestBed } from '@angular/core/testing';

import { CuentaMayorService } from './cuenta-mayor.service';

describe('CuentaMayorService', () => {
  let service: CuentaMayorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CuentaMayorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
