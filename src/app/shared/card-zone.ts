import { CdkDropList } from '@angular/cdk/drag-drop';

export interface CardZone {
  // receive drop lists that we are willing to give our items to
  canDragItemsToZones: CdkDropList[];

  // accessor to read all drop zones available
  getDropzones(): CdkDropList[];
}
