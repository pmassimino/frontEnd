import { TestBed } from '@angular/core/testing';

import { ConfigFacturaService } from './config-factura.service';

describe('ConfigFacturaService', () => {
  let service: ConfigFacturaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigFacturaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
