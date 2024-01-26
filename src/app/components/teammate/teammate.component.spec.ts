import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeammateComponent } from './teammate.component';

describe('TeammateComponent', () => {
  let component: TeammateComponent;
  let fixture: ComponentFixture<TeammateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeammateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeammateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
