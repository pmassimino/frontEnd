import { TestBed } from '@angular/core/testing';

import { SettingGlobalService } from './setting-global.service';

describe('SettingGlobalService', () => {
  let service: SettingGlobalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettingGlobalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
