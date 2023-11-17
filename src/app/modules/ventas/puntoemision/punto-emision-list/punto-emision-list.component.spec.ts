import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntoEmisionListComponent } from './punto-emision-list.component';

describe('PuntoEmisionListComponent', () => {
  let component: PuntoEmisionListComponent;
  let fixture: ComponentFixture<PuntoEmisionListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PuntoEmisionListComponent]
    });
    fixture = TestBed.createComponent(PuntoEmisionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
