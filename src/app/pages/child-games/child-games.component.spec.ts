import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildGamesComponent } from './child-games.component';

describe('ChildGamesComponent', () => {
  let component: ChildGamesComponent;
  let fixture: ComponentFixture<ChildGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChildGamesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChildGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
