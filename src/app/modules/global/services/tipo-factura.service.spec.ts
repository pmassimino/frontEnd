import { TestBed } from '@angular/core/testing';

import { TipoFacturaService } from './tipo-factura.service';

describe('TipoFacturaService', () => {
  let service: TipoFacturaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoFacturaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
