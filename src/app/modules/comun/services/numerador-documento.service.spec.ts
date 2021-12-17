import { TestBed } from '@angular/core/testing';

import { NumeradorDocumentoService } from './numerador-documento.service';

describe('NumeradorDocumentoService', () => {
  let service: NumeradorDocumentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NumeradorDocumentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
