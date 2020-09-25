import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Session } from './session.component';

describe('LandingComponent', () => {
  let component: Session;
  let fixture: ComponentFixture<Session>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Session ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Session);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
