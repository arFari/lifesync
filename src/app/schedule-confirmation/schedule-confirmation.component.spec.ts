import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleConfirmationComponent } from './schedule-confirmation.component';

describe('ScheduleConfirmationComponent', () => {
  let component: ScheduleConfirmationComponent;
  let fixture: ComponentFixture<ScheduleConfirmationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScheduleConfirmationComponent]
    });
    fixture = TestBed.createComponent(ScheduleConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
