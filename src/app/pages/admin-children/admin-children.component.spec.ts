import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminChildrenComponent } from './admin-children.component';

describe('AdminChildrenComponent', () => {
  let component: AdminChildrenComponent;
  let fixture: ComponentFixture<AdminChildrenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminChildrenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminChildrenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
