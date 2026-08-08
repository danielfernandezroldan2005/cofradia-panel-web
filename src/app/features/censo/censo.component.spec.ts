import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CensoComponent } from './censo.component';

describe('CensoComponent', () => {
  let component: CensoComponent;
  let fixture: ComponentFixture<CensoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CensoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CensoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
