import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColoringGameComponent } from './coloring-game.component';

describe('ColoringGameComponent', () => {
  let component: ColoringGameComponent;
  let fixture: ComponentFixture<ColoringGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColoringGameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColoringGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
