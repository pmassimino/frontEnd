import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsientoFormComponent } from './asiento-form.component';

describe('AsientoFormComponent', () => {
  let component: AsientoFormComponent;
  let fixture: ComponentFixture<AsientoFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AsientoFormComponent]
    });
    fixture = TestBed.createComponent(AsientoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
