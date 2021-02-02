import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ToolbarFormComponent } from './toolbar-form.component';

describe('ToolbarFormComponent', () => {
  let component: ToolbarFormComponent;
  let fixture: ComponentFixture<ToolbarFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolbarFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
