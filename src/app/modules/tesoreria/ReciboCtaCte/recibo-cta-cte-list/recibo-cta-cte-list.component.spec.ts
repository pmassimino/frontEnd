import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReciboCtaCteListComponent } from './recibo-cta-cte-list.component';

describe('ReciboCtaCteListComponent', () => {
  let component: ReciboCtaCteListComponent;
  let fixture: ComponentFixture<ReciboCtaCteListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReciboCtaCteListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReciboCtaCteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
