import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildPlayComponent } from './child-play.component';

describe('ChildPlayComponent', () => {
  let component: ChildPlayComponent;
  let fixture: ComponentFixture<ChildPlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChildPlayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChildPlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
