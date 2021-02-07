import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ToolDetailsComponent } from './tool-details.component';

describe('ToolDetailsComponent', () => {
  let component: ToolDetailsComponent;
  let fixture: ComponentFixture<ToolDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
