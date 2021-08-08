import { TestBed } from '@angular/core/testing';

import { MovCtaCteService } from './mov-cta-cte.service';

describe('CtaCteService', () => {
  let service: MovCtaCteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovCtaCteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
