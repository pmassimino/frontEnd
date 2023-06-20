import { TestBed } from '@angular/core/testing';

import { LibroIvaService } from './libro-iva.service';

describe('LibroIvaService', () => {
  let service: LibroIvaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LibroIvaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
