import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiarioListComponent } from './diario-list.component';

describe('DiarioListComponent', () => {
  let component: DiarioListComponent;
  let fixture: ComponentFixture<DiarioListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiarioListComponent]
    });
    fixture = TestBed.createComponent(DiarioListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
