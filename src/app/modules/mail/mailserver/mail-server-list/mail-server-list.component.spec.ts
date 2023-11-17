import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailServerListComponent } from './mail-server-list.component';

describe('MailServerListComponent', () => {
  let component: MailServerListComponent;
  let fixture: ComponentFixture<MailServerListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MailServerListComponent]
    });
    fixture = TestBed.createComponent(MailServerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
