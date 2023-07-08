import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MayorListViewComponent } from './mayor-list-view.component';

describe('MayorListViewComponent', () => {
  let component: MayorListViewComponent;
  let fixture: ComponentFixture<MayorListViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MayorListViewComponent]
    });
    fixture = TestBed.createComponent(MayorListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
