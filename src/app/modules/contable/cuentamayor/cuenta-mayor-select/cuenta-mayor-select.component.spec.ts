import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaMayorSelectComponent } from './cuenta-mayor-select.component';

describe('CuentaMayorSelectComponent', () => {
  let component: CuentaMayorSelectComponent;
  let fixture: ComponentFixture<CuentaMayorSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuentaMayorSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentaMayorSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
