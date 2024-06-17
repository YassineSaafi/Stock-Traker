import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentesmensuelleComponent } from './ventesmensuelle.component';

describe('VentesmensuelleComponent', () => {
  let component: VentesmensuelleComponent;
  let fixture: ComponentFixture<VentesmensuelleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentesmensuelleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VentesmensuelleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
