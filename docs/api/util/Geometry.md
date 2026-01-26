# Geometry

几何工具，提供点、线、矩形相关的几何计算功能。

## 模块说明

`Geometry` 提供了用于几何计算的工具函数，包括点之间距离、点在线上判断、点对齐检测等。

## 模块依赖

此模块为纯工具函数模块，无外部依赖。

## 公共方法

### pointDistance()

**作用**: 计算两点之间的欧几里得距离。

**参数**:

- `a` `{Point}`: 第一个点
- `b` `{Point}`: 第二个点

**返回值**: `{number}` - 距离，如果点无效返回 -1

**示例**:

```javascript
import { pointDistance } from "diagram-js/lib/util/Geometry";

const dist = pointDistance({ x: 0, y: 0 }, { x: 3, y: 4 });
// 5 (勾股定理: √(3²+4²))
```

---

### pointsOnLine()

**作用**: 检查点 r 是否在点 p 和 q 之间的线段上。

**参数**:

- `p` `{Point}`: 起点
- `q` `{Point}`: 终点
- `r` `{Point}`: 要检查的点
- `accuracy` `{number}` (可选): 精度，默认 5

**返回值**: `{boolean}` - 是否在线上

**示例**:

```javascript
import { pointsOnLine } from "diagram-js/lib/util/Geometry";

const p = { x: 0, y: 0 };
const q = { x: 10, y: 10 };
const r = { x: 5, y: 5 };

pointsOnLine(p, q, r); // true
pointsOnLine(p, q, { x: 5, y: 6 }, 1); // false (精度1，不在线上)
```

---

### pointsAligned()

**作用**: 检查点是否水平或垂直对齐。

**参数**:

- `a` `{Point[] | Point}`: 点或点数组
- `b` `{Point}` (可选): 第二个点

**返回值**: `{'h' | 'v' | false}` - 对齐方式：'h'(水平), 'v'(垂直), false(不对齐)

**示例**:

```javascript
import { pointsAligned } from "diagram-js/lib/util/Geometry";

pointsAligned({ x: 100, y: 100 }, { x: 200, y: 100 }); // 'h' (水平)
pointsAligned({ x: 100, y: 100 }, { x: 100, y: 200 }); // 'v' (垂直)
pointsAligned({ x: 100, y: 100 }, { x: 200, y: 200 }); // false
```

---

### pointsAlignedOnAxis()

**作用**: 检查多个点是否在指定轴上对齐。

**参数**:

- `axis` `{'x' | 'y'}`: 轴
- `points` `{Point[]}`: 点数组

**返回值**: `{boolean}` - 是否对齐

---

### pointInRect()

**作用**: 检查点是否在矩形内。

**参数**:

- `p` `{Point}`: 点
- `rect` `{Rect}`: 矩形
- `tolerance` `{number}` (可选): 容差，默认 0

**返回值**: `{boolean}` - 是否在矩形内

**示例**:

```javascript
import { pointInRect } from "diagram-js/lib/util/Geometry";

const rect = { x: 100, y: 100, width: 100, height: 80 };

pointInRect({ x: 150, y: 140 }, rect); // true
pointInRect({ x: 50, y: 50 }, rect); // false
pointInRect({ x: 99, y: 140 }, rect, 2); // true (带容差)
```

---

### getMidPoint()

**作用**: 获取两点的中点。

**参数**:

- `p` `{Point}`: 第一个点
- `q` `{Point}`: 第二个点

**返回值**: `{Point}` - 中点

**示例**:

```javascript
import { getMidPoint } from "diagram-js/lib/util/Geometry";

const mid = getMidPoint({ x: 0, y: 0 }, { x: 100, y: 200 });
// { x: 50, y: 100 }
```

## 使用场景

### 检测鼠标是否点击在连接线上

```javascript
import { pointsOnLine, pointDistance } from "diagram-js/lib/util/Geometry";

function isPointOnConnection(point, connection) {
  const waypoints = connection.waypoints;

  for (let i = 0; i < waypoints.length - 1; i++) {
    if (pointsOnLine(waypoints[i], waypoints[i + 1], point, 10)) {
      return true;
    }
  }

  return false;
}
```

### 对齐辅助线

```javascript
import { pointsAligned } from "diagram-js/lib/util/Geometry";

function showAlignmentGuides(movingShape, otherShapes) {
  otherShapes.forEach((other) => {
    const alignment = pointsAligned(center(movingShape), center(other));

    if (alignment === "h") {
      showHorizontalGuideLine(movingShape.y);
    } else if (alignment === "v") {
      showVerticalGuideLine(movingShape.x);
    }
  });
}
```

## 相关模块

- `PositionUtil`: 提供位置和中心点计算
- `LineIntersection`: 提供线段交点计算
