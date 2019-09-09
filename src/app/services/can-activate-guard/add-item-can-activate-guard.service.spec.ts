import { TestBed } from '@angular/core/testing';

import { AddItemCanActivateGuardService } from './add-item-can-activate-guard.service';

describe('AddItemCanActivateGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddItemCanActivateGuardService = TestBed.get(AddItemCanActivateGuardService);
    expect(service).toBeTruthy();
  });
});
