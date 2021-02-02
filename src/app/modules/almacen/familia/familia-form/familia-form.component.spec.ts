import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FamiliaFormComponent } from './familia-form.component';

describe('FamiliaFormComponent', () => {
  let component: FamiliaFormComponent;
  let fixture: ComponentFixture<FamiliaFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FamiliaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamiliaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
