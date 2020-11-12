import { TestBed } from '@angular/core/testing';

import { CondIvaOperacionService } from './cond-iva-operacion.service';

describe('CondIvaOperacionService', () => {
  let service: CondIvaOperacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CondIvaOperacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
