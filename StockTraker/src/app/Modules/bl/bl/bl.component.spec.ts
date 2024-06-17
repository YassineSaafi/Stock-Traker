import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlComponent } from './bl.component';

describe('BlComponent', () => {
  let component: BlComponent;
  let fixture: ComponentFixture<BlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
