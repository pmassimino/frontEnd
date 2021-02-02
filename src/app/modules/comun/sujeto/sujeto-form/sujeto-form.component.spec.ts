import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SujetoFormComponent } from './sujeto-form.component';

describe('SujetoFormComponent', () => {
  let component: SujetoFormComponent;
  let fixture: ComponentFixture<SujetoFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SujetoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SujetoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
