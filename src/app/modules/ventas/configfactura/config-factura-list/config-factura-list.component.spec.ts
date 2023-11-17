import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigFacturaListComponent } from './config-factura-list.component';

describe('ConfigFacturaListComponent', () => {
  let component: ConfigFacturaListComponent;
  let fixture: ComponentFixture<ConfigFacturaListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigFacturaListComponent]
    });
    fixture = TestBed.createComponent(ConfigFacturaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
