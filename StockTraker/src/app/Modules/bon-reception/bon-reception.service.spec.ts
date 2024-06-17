import { TestBed } from '@angular/core/testing';

import { BonReceptionService } from './bon-reception.service';

describe('BonReceptionService', () => {
  let service: BonReceptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BonReceptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
