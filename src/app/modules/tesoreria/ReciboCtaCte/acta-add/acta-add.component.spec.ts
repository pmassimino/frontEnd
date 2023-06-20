import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ACtaAddComponent } from './acta-add.component';

describe('ACtaAddComponent', () => {
  let component: ACtaAddComponent;
  let fixture: ComponentFixture<ACtaAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ACtaAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ACtaAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
