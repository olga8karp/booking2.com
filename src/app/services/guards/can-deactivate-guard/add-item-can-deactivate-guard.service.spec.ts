import { TestBed } from "@angular/core/testing";

import { AddItemCanDeactivateGuardService } from "./add-item-can-deactivate-guard.service";

describe("AddItemCanDeactivateGuardService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: AddItemCanDeactivateGuardService = TestBed.get(
      AddItemCanDeactivateGuardService
    );
    expect(service).toBeTruthy();
  });
});
