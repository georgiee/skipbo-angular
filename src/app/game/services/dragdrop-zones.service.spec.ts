import { TestBed } from '@angular/core/testing';

import { DragdropZonesService } from './dragdrop-zones.service';

describe('DragdropZonesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DragdropZonesService = TestBed.get(DragdropZonesService);
    expect(service).toBeTruthy();
  });
});
