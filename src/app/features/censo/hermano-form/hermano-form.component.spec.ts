import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HermanoFormComponent } from './hermano-form.component';

describe('HermanoFormComponent', () => {
  let component: HermanoFormComponent;
  let fixture: ComponentFixture<HermanoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HermanoFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HermanoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
