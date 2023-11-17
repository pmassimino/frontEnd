import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigFacturaFormComponent } from './config-factura-form.component';

describe('ConfigFacturaFormComponent', () => {
  let component: ConfigFacturaFormComponent;
  let fixture: ComponentFixture<ConfigFacturaFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigFacturaFormComponent]
    });
    fixture = TestBed.createComponent(ConfigFacturaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
