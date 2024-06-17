import { TestBed } from '@angular/core/testing';

import { FournisseurDevisService } from './fournisseur-devis.service';

describe('FournisseurDevisService', () => {
  let service: FournisseurDevisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FournisseurDevisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
