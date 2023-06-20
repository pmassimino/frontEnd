import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarteraValorListComponent } from './cartera-valor-list.component';

describe('CarteraValorListComponent', () => {
  let component: CarteraValorListComponent;
  let fixture: ComponentFixture<CarteraValorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarteraValorListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarteraValorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
