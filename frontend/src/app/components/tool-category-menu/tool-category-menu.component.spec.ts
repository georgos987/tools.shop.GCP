import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ToolCategoryMenuComponent } from './tool-category-menu.component';

describe('ProductCategoryMenuComponent', () => {
  let component: ToolCategoryMenuComponent;
  let fixture: ComponentFixture<ToolCategoryMenuComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolCategoryMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolCategoryMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
