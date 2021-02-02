import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MayorListComponent } from './mayor-list.component';

describe('MayorListComponent', () => {
  let component: MayorListComponent;
  let fixture: ComponentFixture<MayorListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MayorListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MayorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
