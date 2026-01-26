# LayoutUtil

布局工具，提供布局计算的辅助函数。

## 模块说明

`LayoutUtil` 提供各种布局计算的工具函数。

## 主要函数

### getMidPoint(p1, p2)

获取两点的中点。

### getOrientation(rect, reference, padding)

获取参考点相对于矩形的方位（top/bottom/left/right）。

### asTRBL(bounds)

将边界框转换为 TRBL（top/right/bottom/left）格式。

**示例**:

```javascript
const bounds = { x: 100, y: 100, width: 100, height: 80 };
const trbl = asTRBL(bounds);
// { top: 100, right: 200, bottom: 180, left: 100 }
```

### roundPoint(point)

将点坐标四舍五入为整数。

### roundBounds(bounds)

将边界框坐标四舍五入为整数。

## 使用示例

```javascript
import { getOrientation, asTRBL } from "diagram-js/lib/layout/LayoutUtil";

const orientation = getOrientation(
  { x: 100, y: 100, width: 100, height: 80 },
  { x: 150, y: 90 },
);
// 'top'
```

## 相关模块

- `AttachUtil`: 使用布局工具计算附着位置
- `ManhattanLayout`: 使用布局工具
