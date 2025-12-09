import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovementPeriodComponent } from './movement-period.component';

describe('MovementPeriodComponent', () => {
  let component: MovementPeriodComponent;
  let fixture: ComponentFixture<MovementPeriodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovementPeriodComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovementPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
