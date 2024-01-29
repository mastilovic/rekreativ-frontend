import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTeammateComponent } from './create-teammate.component';

describe('CreateTeammateComponent', () => {
  let component: CreateTeammateComponent;
  let fixture: ComponentFixture<CreateTeammateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTeammateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTeammateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
