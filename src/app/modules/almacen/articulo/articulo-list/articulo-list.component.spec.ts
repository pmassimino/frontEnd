import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ArticuloListComponent } from './articulo-list.component';

describe('ArticuloListComponent', () => {
  let component: ArticuloListComponent;
  let fixture: ComponentFixture<ArticuloListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticuloListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticuloListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
