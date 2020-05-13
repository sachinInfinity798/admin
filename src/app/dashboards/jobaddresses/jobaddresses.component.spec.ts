import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobaddressesComponent } from './jobaddresses.component';

describe('JobaddressesComponent', () => {
  let component: JobaddressesComponent;
  let fixture: ComponentFixture<JobaddressesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobaddressesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobaddressesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
