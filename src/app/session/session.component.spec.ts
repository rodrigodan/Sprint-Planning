import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingPlace } from './session.component';

describe('LandingComponent', () => {
  let component: MeetingPlace;
  let fixture: ComponentFixture<MeetingPlace>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingPlace ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingPlace);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
