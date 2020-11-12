import { TestBed } from '@angular/core/testing';

import { UsoCuentaMayorService } from './uso-cuenta-mayor.service';

describe('UsoCuentaMayorService', () => {
  let service: UsoCuentaMayorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsoCuentaMayorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
