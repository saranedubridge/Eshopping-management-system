import { TestBed } from '@angular/core/testing';

import { EshoppingService } from './eshopping.service';

describe('EshoppingService', () => {
  let service: EshoppingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EshoppingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
