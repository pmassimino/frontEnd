import { TestBed } from '@angular/core/testing';

import { TipoCuentaMayorService } from './tipo-cuenta-mayor.service';

describe('TipoCuentaMayorService', () => {
  let service: TipoCuentaMayorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoCuentaMayorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
