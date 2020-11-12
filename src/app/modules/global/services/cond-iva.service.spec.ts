import { TestBed } from '@angular/core/testing';

import { CondIvaService } from './cond-iva.service';

describe('CondIvaService', () => {
  let service: CondIvaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CondIvaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
