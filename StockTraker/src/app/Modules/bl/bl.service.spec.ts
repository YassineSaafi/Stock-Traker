import { TestBed } from '@angular/core/testing';

import {BonDeLivraisonService } from './bl.service';

describe('BlService', () => {
  let service: BonDeLivraisonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BonDeLivraisonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
