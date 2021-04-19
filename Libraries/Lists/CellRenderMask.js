/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 * @format
 */

import invariant from 'invariant';

export type CellRegion = {
  first: number,
  last: number,
  isSpacer: boolean,
};

export class CellRenderMask {
  _numCells: number;
  _regions: Array<CellRegion>;

  constructor(numCells: number) {
    invariant(numCells >= 1);

    this._numCells = numCells;
    this._regions = [
      {
        first: 0,
        last: numCells - 1,
        isSpacer: true,
      },
    ];
  }

  enumerateRegions(): $ReadOnlyArray<CellRegion> {
    return this._regions;
  }

  addCells(cells: {first: number, last: number}) {
    invariant(cells.first >= 0 && cells.first < this._numCells);
    invariant(cells.last >= 0 && cells.last < this._numCells);
    invariant(cells.last >= cells.first);

    const [firstIntersect, firstIntersectIdx] = this._findRegion(cells.first);
    const [lastIntersect, lastIntersectIdx] = this._findRegion(cells.last);

    // Fast-path if the cells to add are already all present in the mask. We
    // will otherwise need to do some mutation.
    if (firstIntersectIdx === lastIntersectIdx && !firstIntersect.isSpacer) {
      return;
    }

    // We need to replace the existing covered regions with 1-3 new regions
    // depending whether we need to split spacers out of overlapping regions.
    const newLeadRegion: Array<CellRegion> = [];
    const newTailRegion: Array<CellRegion> = [];
    const newMainRegion: CellRegion = {
      ...cells,
      isSpacer: false,
    };

    if (firstIntersect.first < newMainRegion.first) {
      if (firstIntersect.isSpacer) {
        newLeadRegion.push({
          first: firstIntersect.first,
          last: newMainRegion.first - 1,
          isSpacer: true,
        });
      } else {
        newMainRegion.first = firstIntersect.first;
      }
    }

    if (lastIntersect.last > newMainRegion.last) {
      if (lastIntersect.isSpacer) {
        newTailRegion.push({
          first: newMainRegion.last + 1,
          last: lastIntersect.last,
          isSpacer: true,
        });
      } else {
        newMainRegion.last = lastIntersect.last;
      }
    }

    const replacementRegions: Array<CellRegion> = [
      ...newLeadRegion,
      newMainRegion,
      ...newTailRegion,
    ];
    const numRegionsToDelete = lastIntersectIdx - firstIntersectIdx + 1;
    this._regions.splice(
      firstIntersectIdx,
      numRegionsToDelete,
      ...replacementRegions,
    );
  }

  equals(other: CellRenderMask): boolean {
    return (
      this._numCells === other._numCells &&
      this._regions.length === other._regions.length &&
      this._regions.every(
        (region, i) =>
          region.first === other._regions[i].first &&
          region.last === other._regions[i].last &&
          region.isSpacer === other._regions[i].isSpacer,
      )
    );
  }

  _findRegion(cellIdx: number): [CellRegion, number] {
    // TODO replace with binary search
    const index = this._regions.findIndex(
      region => region.first <= cellIdx && region.last >= cellIdx,
    );
    invariant(index !== -1);
    return [this._regions[index], index];
  }
}
