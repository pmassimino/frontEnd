import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EmpresaSelectComponent } from './empresa-select.component';

describe('EmpresaSelectComponent', () => {
  let component: EmpresaSelectComponent;
  let fixture: ComponentFixture<EmpresaSelectComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpresaSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresaSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
