import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobcontactsComponent } from './jobcontacts.component';

describe('JobcontactsComponent', () => {
  let component: JobcontactsComponent;
  let fixture: ComponentFixture<JobcontactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobcontactsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobcontactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
