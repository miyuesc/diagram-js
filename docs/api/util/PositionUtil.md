# PositionUtil

位置工具，提供位置和中心点计算功能。

## 模块说明

`PositionUtil` 提供了用于计算元素中心点和点之间差值的工具函数。

## 模块依赖

此模块为纯工具函数模块，无外部依赖。

## 公共方法

### center()

**作用**: 计算矩形区域的中心点。

**参数**:

- `bounds` `{Rect}`: 矩形区域 `{ x, y, width, height }`

**返回值**: `{Point}` - 中心点 `{ x, y }`

**示例**:

```javascript
import { center } from "diagram-js/lib/util/PositionUtil";

const bounds = { x: 100, y: 100, width: 200, height: 150 };
const centerPoint = center(bounds);
// { x: 200, y: 175 }
```

---

### delta()

**作用**: 计算两个点之间的差值。

**参数**:

- `a` `{Point}`: 第一个点
- `b` `{Point}`: 第二个点

**返回值**: `{Point}` - 差值 `{ x: a.x - b.x, y: a.y - b.y }`

**示例**:

```javascript
import { delta } from "diagram-js/lib/util/PositionUtil";

const pointA = { x: 300, y: 250 };
const pointB = { x: 100, y: 150 };
const diff = delta(pointA, pointB);
// { x: 200, y: 100 }
```

## 使用场景

### 居中显示元素

```javascript
import { center } from "diagram-js/lib/util/PositionUtil";

function scrollToElement(element) {
  const elementCenter = center(element);
  const viewbox = canvas.viewbox();

  canvas.scroll({
    dx: elementCenter.x - viewbox.width / 2,
    dy: elementCenter.y - viewbox.height / 2,
  });
}
```

### 计算拖拽偏移

```javascript
import { delta } from "diagram-js/lib/util/PositionUtil";

let startPoint;

eventBus.on("drag.start", function (event) {
  startPoint = { x: event.x, y: event.y };
});

eventBus.on("drag.move", function (event) {
  const currentPoint = { x: event.x, y: event.y };
  const offset = delta(currentPoint, startPoint);

  // 移动元素
  moveElement(element, offset);
});
```

### 连接线中点计算

```javascript
import { center } from "diagram-js/lib/util/PositionUtil";
import { getBBox } from "diagram-js/lib/util/Elements";

function getConnectionMidpoint(connection) {
  const bbox = getBBox(connection);
  return center(bbox);
}
```

## 相关模块

- `Elements.getBBox()`: 计算元素边界框，可与 center() 配合使用
- `Math.substract()`: delta() 的别名导出
