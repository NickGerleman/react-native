/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @generated by enums.py
// clang-format off
#pragma once

#include <cstdint>
#include <yoga/YGEnums.h>
#include <yoga/enums/YogaEnums.h>

namespace facebook::yoga {

enum class Edge : uint8_t {
  Left = YGEdgeLeft,
  Top = YGEdgeTop,
  Right = YGEdgeRight,
  Bottom = YGEdgeBottom,
  Start = YGEdgeStart,
  End = YGEdgeEnd,
  Horizontal = YGEdgeHorizontal,
  Vertical = YGEdgeVertical,
  All = YGEdgeAll,
};

template <>
constexpr inline int32_t ordinalCount<Edge>() {
  return 9;
} 

template <>
constexpr inline int32_t bitCount<Edge>() {
  return 4;
} 

constexpr inline Edge scopedEnum(YGEdge unscoped) {
  return static_cast<Edge>(unscoped);
}

constexpr inline YGEdge unscopedEnum(Edge scoped) {
  return static_cast<YGEdge>(scoped);
}

inline const char* toString(Edge e) {
  return YGEdgeToString(unscopedEnum(e));
}

} // namespace facebook::yoga
