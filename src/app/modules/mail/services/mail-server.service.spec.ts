import { TestBed } from '@angular/core/testing';

import { MailServerService } from './mail-server.service';

describe('MailServerService', () => {
  let service: MailServerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MailServerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
