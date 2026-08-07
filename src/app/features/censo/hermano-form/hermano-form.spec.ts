import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HermanoForm } from './hermano-form';

describe('HermanoForm', () => {
  let component: HermanoForm;
  let fixture: ComponentFixture<HermanoForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HermanoForm],
    }).compileComponents();

    fixture = TestBed.createComponent(HermanoForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
