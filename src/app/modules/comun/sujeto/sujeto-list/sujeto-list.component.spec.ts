import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SujetoListComponent } from './sujeto-list.component';

describe('SujetoListComponent', () => {
  let component: SujetoListComponent;
  let fixture: ComponentFixture<SujetoListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SujetoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SujetoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
