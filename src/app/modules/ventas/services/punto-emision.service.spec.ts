import { TestBed } from '@angular/core/testing';

import { PuntoEmisionService } from './punto-emision.service';

describe('PuntoVentaService', () => {
  let service: PuntoEmisionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PuntoEmisionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
