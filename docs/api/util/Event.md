# Event

事件工具，提供事件处理辅助函数。

## 模块说明

`Event` 提供了用于处理 DOM 和自定义事件的工具函数。

## 模块依赖

此模块为纯工具函数模块，无外部依赖。

## 公共方法

### getOriginal()

**作用**: 获取原始 DOM 事件。

**参数**:

- `event` `{Event}`: 事件对象（可能是包装过的）

**返回值**: `{Event}` - 原始 DOM 事件

**说明**: 从包装的事件对象中提取 `originalEvent` 或 `srcEvent`。

**示例**:

```javascript
import { getOriginal } from "diagram-js/lib/util/Event";

eventBus.on("element.click", function (event) {
  const domEvent = getOriginal(event);
  console.log(domEvent.clientX, domEvent.clientY);
});
```

---

### stopPropagation()

**作用**: 停止事件传播（包括原始事件）。

**参数**:

- `event` `{Event}`: 事件对象

**说明**: 同时停止包装事件和原始 DOM 事件的传播。

**示例**:

```javascript
import { stopPropagation } from "diagram-js/lib/util/Event";

eventBus.on("element.click", function (event) {
  stopPropagation(event);
  // 事件不会继续传播
});
```

---

### toPoint()

**作用**: 将事件转换为坐标点。

**参数**:

- `event` `{Event}`: 鼠标或触摸事件

**返回值**: `{Point | null}` - 坐标点 `{ x, y }` 或 `null`

**说明**:

- 支持鼠标事件（使用 `clientX/Y`）
- 支持触摸事件（使用第一个触摸点）
- 支持指针事件（使用第一个指针）

**示例**:

```javascript
import { toPoint } from "diagram-js/lib/util/Event";

element.addEventListener("mousedown", function (event) {
  const point = toPoint(event);
  console.log("点击位置:", point.x, point.y);
});

// 触摸事件也支持
element.addEventListener("touchstart", function (event) {
  const point = toPoint(event);
  console.log("触摸位置:", point.x, point.y);
});
```

## 使用场景

### 获取点击位置

```javascript
import { toPoint } from "diagram-js/lib/util/Event";

eventBus.on("canvas.click", function (event) {
  const point = toPoint(event);

  // 转换为画布坐标
  const canvasPoint = canvas.viewbox().transformPoint(point);
});
```

### 停止事件冒泡

```javascript
import { stopPropagation } from "diagram-js/lib/util/Event";

eventBus.on("element.contextmenu", function (event) {
  // 显示自定义上下文菜单
  showContextMenu(event);

  // 阻止浏览器默认上下文菜单
  stopPropagation(event);
  event.preventDefault();
});
```

## 相关模块

- `Mouse`: 使用 Event 工具处理鼠标事件
- `InteractionEvents`: 使用 Event 工具处理交互事件
