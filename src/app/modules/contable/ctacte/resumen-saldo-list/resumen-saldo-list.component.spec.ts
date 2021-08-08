import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenSaldoListComponent } from './resumen-saldo-list.component';

describe('ResumenSaldoListComponent', () => {
  let component: ResumenSaldoListComponent;
  let fixture: ComponentFixture<ResumenSaldoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumenSaldoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenSaldoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
