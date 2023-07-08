import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MayorBalanceComponent } from './mayor-balance.component';

describe('MayorBalanceComponent', () => {
  let component: MayorBalanceComponent;
  let fixture: ComponentFixture<MayorBalanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MayorBalanceComponent]
    });
    fixture = TestBed.createComponent(MayorBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
