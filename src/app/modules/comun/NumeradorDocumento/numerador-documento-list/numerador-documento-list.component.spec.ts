import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumeradorDocumentoListComponent } from './numerador-documento-list.component';

describe('NumeradorDocumentoListComponent', () => {
  let component: NumeradorDocumentoListComponent;
  let fixture: ComponentFixture<NumeradorDocumentoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumeradorDocumentoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NumeradorDocumentoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
