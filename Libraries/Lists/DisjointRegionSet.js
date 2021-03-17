/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 * @format
 */

export type ContiguousSection = {
  first: number,
  last: number,
  isGap: boolean,
};

export type Region = {
  first: number,
  last: number,
};

export class DisjointRegionSet {
  constructor(length: number) {}

  enumerateSections(): Array<ContiguousSection> {}

  add(region: Region) {}

  intersectionWith(region: Region): Array<Region> {}

  gapsIn(region: Region): Array<Region> {}

  constrainTo(region: Region): DisjointRegionSet {}

  equals(): boolean {}
}
