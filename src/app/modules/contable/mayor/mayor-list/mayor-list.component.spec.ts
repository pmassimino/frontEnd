import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MayorListComponent } from './mayor-list.component';

describe('MayorListComponent', () => {
  let component: MayorListComponent;
  let fixture: ComponentFixture<MayorListComponent>;

  beforeEach(async(() => {
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
