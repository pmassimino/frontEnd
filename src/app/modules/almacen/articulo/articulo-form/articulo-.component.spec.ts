import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ArticuloCreateComponent } from './articulo-create.component';

describe('ArticuloCreateComponent', () => {
  let component: ArticuloCreateComponent;
  let fixture: ComponentFixture<ArticuloCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticuloCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticuloCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
