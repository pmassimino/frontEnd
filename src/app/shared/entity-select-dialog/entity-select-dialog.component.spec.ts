import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntitySelectDialogComponent } from './entity-select-dialog.component';

describe('EntitySelectDialogComponent', () => {
  let component: EntitySelectDialogComponent;
  let fixture: ComponentFixture<EntitySelectDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EntitySelectDialogComponent]
    });
    fixture = TestBed.createComponent(EntitySelectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
