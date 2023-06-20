import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibroIvaListComponent } from './libro-iva-list.component';

describe('LibroIvaListComponent', () => {
  let component: LibroIvaListComponent;
  let fixture: ComponentFixture<LibroIvaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibroIvaListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibroIvaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
