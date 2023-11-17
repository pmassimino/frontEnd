import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntoEmisionFormComponent } from './punto-emision-form.component';

describe('PuntoEmisionFormComponent', () => {
  let component: PuntoEmisionFormComponent;
  let fixture: ComponentFixture<PuntoEmisionFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PuntoEmisionFormComponent]
    });
    fixture = TestBed.createComponent(PuntoEmisionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
