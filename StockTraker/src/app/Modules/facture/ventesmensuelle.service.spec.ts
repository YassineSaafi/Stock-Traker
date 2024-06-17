import { TestBed } from '@angular/core/testing';

import { VentesmensuelleService } from './ventesmensuelle.service';

describe('VentesmensuelleService', () => {
  let service: VentesmensuelleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VentesmensuelleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
