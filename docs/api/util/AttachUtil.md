# AttachUtil

附着工具，提供计算附着元素位置的功能。

## 模块说明

`AttachUtil` 提供了用于计算附着元素（如标签、边界事件）在宿主元素调整大小或移动时的新位置的工具函数。

## 模块依赖

```typescript
- LayoutUtil: 提供布局计算功能
- PositionUtil: 提供位置计算功能
```

## 公共方法

### getNewAttachPoint()

**作用**: 计算附着点相对于新元素位置的绝对坐标。

**参数**:

- `point` `{Point}`: 原附着点（绝对坐标）
- `oldBounds` `{Rect}`: 原边界框
- `newBounds` `{Rect}`: 新边界框

**返回值**: `{Point}` - 新附着点（绝对坐标）

**说明**: 按比例计算附着点在新边界框中的位置。

**示例**:

```javascript
import { getNewAttachPoint } from "diagram-js/lib/util/AttachUtil";

const oldBounds = { x: 100, y: 100, width: 100, height: 80 };
const newBounds = { x: 150, y: 150, width: 150, height: 120 };
const attachPoint = { x: 150, y: 100 }; // 原附着点在顶部边缘中心

const newPoint = getNewAttachPoint(attachPoint, oldBounds, newBounds);
// 返回新的附着点位置，保持相对位置比例
```

---

### getNewAttachShapeDelta()

**作用**: 计算附着图形相对于宿主元素新位置的偏移量。

**参数**:

- `shape` `{Shape}`: 附着图形
- `oldBounds` `{Rect}`: 宿主元素原边界框
- `newBounds` `{Rect}`: 宿主元素新边界框

**返回值**: `{Point}` - 偏移量 `{ x, y }`

**说明**:

- 支持"粘性"定位：元素附着在边缘时，调整大小时保持附着在同一边
- 对于中间位置，按比例缩放位置

**示例**:

```javascript
import { getNewAttachShapeDelta } from "diagram-js/lib/util/AttachUtil";

const label = { x: 150, y: 90, width: 50, height: 20 }; // 附着的标签
const oldBounds = { x: 100, y: 100, width: 100, height: 80 };
const newBounds = { x: 100, y: 100, width: 150, height: 120 }; // 宿主调整大小

const delta = getNewAttachShapeDelta(label, oldBounds, newBounds);
// 应用偏移量: label.x += delta.x; label.y += delta.y;
```

## 使用场景

### 调整元素大小时更新附着的标签

```javascript
import { getNewAttachShapeDelta } from "diagram-js/lib/util/AttachUtil";

eventBus.on("shape.resize", function (event) {
  const shape = event.shape;
  const oldBounds = event.oldBounds;
  const newBounds = {
    x: shape.x,
    y: shape.y,
    width: shape.width,
    height: shape.height,
  };

  // 更新所有附着的标签
  shape.labels.forEach((label) => {
    const delta = getNewAttachShapeDelta(label, oldBounds, newBounds);
    modeling.moveShape(label, delta);
  });
});
```

### 移动元素时更新附着的边界事件

```javascript
import { getNewAttachPoint } from "diagram-js/lib/util/AttachUtil";

function updateAttachedEvents(shape, oldBounds) {
  const newBounds = {
    x: shape.x,
    y: shape.y,
    width: shape.width,
    height: shape.height,
  };

  shape.attachers.forEach((attacher) => {
    const oldCenter = center(attacher);
    const newCenter = getNewAttachPoint(oldCenter, oldBounds, newBounds);

    const delta = {
      x: newCenter.x - oldCenter.x,
      y: newCenter.y - oldCenter.y,
    };

    modeling.moveShape(attacher, delta);
  });
}
```

## 相关模块

- `PositionUtil`: 提供中心点和偏移量计算
- `LayoutUtil`: 提供方向判断和布局计算
