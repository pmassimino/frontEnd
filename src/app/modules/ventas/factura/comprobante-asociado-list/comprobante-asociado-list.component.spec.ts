import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprobanteAsociadoListComponent } from './comprobante-asociado-list.component';

describe('ComprobanteAsociadoListComponent', () => {
  let component: ComprobanteAsociadoListComponent;
  let fixture: ComponentFixture<ComprobanteAsociadoListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComprobanteAsociadoListComponent]
    });
    fixture = TestBed.createComponent(ComprobanteAsociadoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
