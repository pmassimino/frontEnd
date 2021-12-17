import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReciboCtaCteFormComponent } from './recibo-form.component';

describe('ReciboCtaCteFormComponent', () => {
  let component: ReciboCtaCteFormComponent;
  let fixture: ComponentFixture<ReciboCtaCteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReciboCtaCteFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReciboCtaCteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
