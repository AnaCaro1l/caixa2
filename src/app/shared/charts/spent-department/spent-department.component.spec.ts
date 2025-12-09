import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpentDepartmentComponent } from './spent-department.component';

describe('SpentDepartmentComponent', () => {
  let component: SpentDepartmentComponent;
  let fixture: ComponentFixture<SpentDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpentDepartmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpentDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
