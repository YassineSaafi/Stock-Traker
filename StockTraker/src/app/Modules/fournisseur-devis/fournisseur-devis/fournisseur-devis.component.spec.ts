import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FournisseurDevisComponent } from './fournisseur-devis.component';

describe('FournisseurDevisComponent', () => {
  let component: FournisseurDevisComponent;
  let fixture: ComponentFixture<FournisseurDevisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FournisseurDevisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FournisseurDevisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
