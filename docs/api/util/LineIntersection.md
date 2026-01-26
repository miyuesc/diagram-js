# LineIntersection

线段交点工具，提供计算线段与点、线段之间交点的功能。

## 模块说明

`LineIntersection` 提供了用于计算连接线上最近点的工具函数，常用于bendpoint编辑。

## 模块依赖

```typescript
- Geometry: 提供点距离计算
- path-intersection: 第三方库，计算路径交点
```

## TypeScript 类型

```typescript
/**
 * 交点信息
 */
interface Intersection {
  /** 交点位置 */
  point: Point;
  /** 交点的路径点索引 */
  index: number;
  /** 是否为路径点本身 */
  bendpoint?: boolean;
}
```

## 公共方法

### getApproxIntersection()

**作用**: 返回连接线上最接近参考点的点。

**参数**:

- `waypoints` `{Point[]}`: 连接线的路径点
- `reference` `{Point}`: 参考点

**返回值**: `{Intersection | null}` - 交点信息或 null

**说明**:

- 首先检查参考点是否接近某个路径点（阈值10像素）
- 如果不是，计算参考点到路径的最近点
- 返回交点位置、索引和是否为bendpoint

**示例**:

```javascript
import { getApproxIntersection } from "diagram-js/lib/util/LineIntersection";

const waypoints = [
  { x: 100, y: 100 },
  { x: 200, y: 100 },
  { x: 200, y: 200 },
];

const reference = { x: 150, y: 100 };
const intersection = getApproxIntersection(waypoints, reference);

// {
//   point: { x: 150, y: 100 },
//   index: 1,
//   bendpoint: false
// }
```

## 使用场景

### Bendpoint 编辑

```javascript
import { getApproxIntersection } from "diagram-js/lib/util/LineIntersection";

eventBus.on("connection.mousedown", function (event) {
  const connection = event.element;
  const mousePos = { x: event.x, y: event.y };

  const intersection = getApproxIntersection(connection.waypoints, mousePos);

  if (intersection) {
    if (intersection.bendpoint) {
      // 点击在现有bendpoint上，可以拖动或删除
      startDragBendpoint(connection, intersection.index);
    } else {
      // 点击在线段上，可以添加新bendpoint
      addBendpoint(connection, intersection.point, intersection.index);
    }
  }
});
```

### 连接线分段

```javascript
import { getApproxIntersection } from "diagram-js/lib/util/LineIntersection";

function splitConnection(connection, splitPoint) {
  const intersection = getApproxIntersection(connection.waypoints, splitPoint);

  if (intersection && !intersection.bendpoint) {
    // 在交点处插入新的路径点
    const newWaypoints = [...connection.waypoints];
    newWaypoints.splice(intersection.index + 1, 0, intersection.point);

    modeling.updateWaypoints(connection, newWaypoints);
  }
}
```

## 相关模块

- `Geometry.pointDistance()`: 计算点之间距离
- `Bendpoints`: 使用 LineIntersection 进行bendpoint编辑
