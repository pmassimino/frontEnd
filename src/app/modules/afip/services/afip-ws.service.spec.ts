import { TestBed } from '@angular/core/testing';

import { AfipWSService } from './afip-ws.service';

describe('AfipWSService', () => {
  let service: AfipWSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AfipWSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
