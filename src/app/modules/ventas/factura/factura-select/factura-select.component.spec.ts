import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturaSelectComponent } from './factura-select.component';

describe('FacturaSelectComponent', () => {
  let component: FacturaSelectComponent;
  let fixture: ComponentFixture<FacturaSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FacturaSelectComponent]
    });
    fixture = TestBed.createComponent(FacturaSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
