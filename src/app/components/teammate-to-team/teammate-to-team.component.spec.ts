import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeammateToTeamComponent } from './teammate-to-team.component';

describe('TeammateToTeamComponent', () => {
  let component: TeammateToTeamComponent;
  let fixture: ComponentFixture<TeammateToTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeammateToTeamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeammateToTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
