import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntoEmisionConfigListComponent } from './punto-emision-config-list.component';

describe('PuntoEmisionConfigListComponent', () => {
  let component: PuntoEmisionConfigListComponent;
  let fixture: ComponentFixture<PuntoEmisionConfigListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PuntoEmisionConfigListComponent]
    });
    fixture = TestBed.createComponent(PuntoEmisionConfigListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
