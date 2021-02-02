import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FacturaFormComponent } from './factura-form.component';

describe('FacturaFormComponent', () => {
  let component: FacturaFormComponent;
  let fixture: ComponentFixture<FacturaFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FacturaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
