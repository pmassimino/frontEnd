import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntoEmisionSelectComponent } from './punto-emision-select.component';

describe('PuntoEmisionSelectComponent', () => {
  let component: PuntoEmisionSelectComponent;
  let fixture: ComponentFixture<PuntoEmisionSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PuntoEmisionSelectComponent]
    });
    fixture = TestBed.createComponent(PuntoEmisionSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
