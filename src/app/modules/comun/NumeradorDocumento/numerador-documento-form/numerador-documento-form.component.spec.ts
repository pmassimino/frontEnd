import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumeradorDocumentoFormComponent } from './numerador-documento-form.component';

describe('NumeradorDocumentoFormComponent', () => {
  let component: NumeradorDocumentoFormComponent;
  let fixture: ComponentFixture<NumeradorDocumentoFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NumeradorDocumentoFormComponent]
    });
    fixture = TestBed.createComponent(NumeradorDocumentoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
