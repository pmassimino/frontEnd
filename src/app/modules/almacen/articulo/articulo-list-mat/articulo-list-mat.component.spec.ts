import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticuloListMatComponent } from './articulo-list-mat.component';

describe('ArticuloListMatComponent', () => {
  let component: ArticuloListMatComponent;
  let fixture: ComponentFixture<ArticuloListMatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticuloListMatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticuloListMatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
