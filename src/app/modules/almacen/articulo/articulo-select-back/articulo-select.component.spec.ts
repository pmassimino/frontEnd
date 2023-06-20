import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticuloSelectComponentBack } from './articulo-select.component';

describe('ArticuloSelectComponent', () => {
  let component: ArticuloSelectComponentBack;
  let fixture: ComponentFixture<ArticuloSelectComponentBack>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticuloSelectComponentBack ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticuloSelectComponentBack);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
