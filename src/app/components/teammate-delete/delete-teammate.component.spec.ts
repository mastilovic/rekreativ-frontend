import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTeammateComponent } from './delete-teammate.component';

describe('DeleteTeammateComponent', () => {
  let component: DeleteTeammateComponent;
  let fixture: ComponentFixture<DeleteTeammateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteTeammateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteTeammateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
