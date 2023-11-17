import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailServerFormComponent } from './mail-server-form.component';

describe('MailServerFormComponent', () => {
  let component: MailServerFormComponent;
  let fixture: ComponentFixture<MailServerFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MailServerFormComponent]
    });
    fixture = TestBed.createComponent(MailServerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
