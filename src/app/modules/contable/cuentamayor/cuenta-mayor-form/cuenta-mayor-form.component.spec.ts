import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CuentaMayorFormComponent } from './cuenta-mayor-form.component';

describe('CuentaMayorFormComponent', () => {
  let component: CuentaMayorFormComponent;
  let fixture: ComponentFixture<CuentaMayorFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CuentaMayorFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentaMayorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
