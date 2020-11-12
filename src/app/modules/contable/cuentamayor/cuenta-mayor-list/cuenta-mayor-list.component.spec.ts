import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaMayorListComponent } from './cuenta-mayor-list.component';

describe('CuentaMayorListComponent', () => {
  let component: CuentaMayorListComponent;
  let fixture: ComponentFixture<CuentaMayorListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuentaMayorListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentaMayorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
