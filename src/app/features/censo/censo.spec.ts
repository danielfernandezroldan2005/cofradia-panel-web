import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Censo } from './censo';

describe('Censo', () => {
  let component: Censo;
  let fixture: ComponentFixture<Censo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Censo],
    }).compileComponents();

    fixture = TestBed.createComponent(Censo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
