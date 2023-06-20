import { TestBed } from '@angular/core/testing';

import { CarteraValorService } from './cartera-valor.service';

describe('CarteraValorService', () => {
  let service: CarteraValorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarteraValorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
