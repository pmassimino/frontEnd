import { TestBed } from '@angular/core/testing';
import { TipoRolService } from './tuipo-rol.service';


describe('RolService', () => {
  let service: TipoRolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoRolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
