import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturaAFIPComponent } from './factura-afip.component';

describe('FacturaAFIPComponent', () => {
  let component: FacturaAFIPComponent;
  let fixture: ComponentFixture<FacturaAFIPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacturaAFIPComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturaAFIPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
