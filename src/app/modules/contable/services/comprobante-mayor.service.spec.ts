import { TestBed } from '@angular/core/testing';

import { ComprobanteMayorService } from './comprobante-mayor.service';

describe('ComprobanteMayorService', () => {
  let service: ComprobanteMayorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComprobanteMayorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
