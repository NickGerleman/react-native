/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 * @format
 */

export type CellRegion = {
  first: number,
  last: number,
  isSpacer: boolean,
};

export class CellRenderMask {
  constructor(numCells: number) {}

  enumerateRegions(): Array<CellRegion> {}
  addCells(cells: {first: number, last: number}) {}
  equals(): boolean {}
}
