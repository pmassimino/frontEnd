import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamiliaListComponent } from './familia-list.component';

describe('FamiliaListComponent', () => {
  let component: FamiliaListComponent;
  let fixture: ComponentFixture<FamiliaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamiliaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamiliaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
