import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactureAchatComponent } from './facture-achat.component';

describe('FactureAchatComponent', () => {
  let component: FactureAchatComponent;
  let fixture: ComponentFixture<FactureAchatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FactureAchatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FactureAchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
