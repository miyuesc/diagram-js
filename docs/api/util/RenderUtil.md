# RenderUtil

渲染工具，提供 SVG 路径生成和线段渲染功能。

## 模块说明

`RenderUtil` 提供了用于将路径点转换为 SVG 路径字符串的工具函数，支持圆角和自定义路径组件。

## 模块依赖

此模块依赖 `tiny-svg` 库。

## TypeScript 类型

```typescript
/**
 * 路径组件
 * 例如: ['M', 100, 200] 或 ['L', 300, 400]
 */
type Component = (string | number)[];
```

## 公共方法

### componentsToPath()

**作用**: 将路径组件数组转换为 SVG 路径字符串。

**参数**:

- `elements` `{Component[] | Component[][]}`: 路径组件数组

**返回值**: `{string}` - SVG 路径字符串

**示例**:

```javascript
import { componentsToPath } from "diagram-js/lib/util/RenderUtil";

const components = [["M", 0, 0], ["L", 100, 0], ["L", 100, 100], ["Z"]];

const path = componentsToPath(components);
// 'M0,0L100,0L100,100Z'
```

---

### toSVGPoints()

**作用**: 将点数组转换为 SVG points 字符串（用于 polygon/polyline）。

**参数**:

- `points` `{Point[]}`: 点数组

**返回值**: `{string}` - SVG points 字符串

**示例**:

```javascript
import { toSVGPoints } from "diagram-js/lib/util/RenderUtil";

const points = [
  { x: 0, y: 0 },
  { x: 100, y: 0 },
  { x: 50, y: 100 },
];

const svgPoints = toSVGPoints(points);
// '0,0 100,0 50,100 '
```

---

### createLine()

**作用**: 创建带圆角的 SVG 路径元素。

**参数**:

- `points` `{Point[]}`: 路径点
- `attrs` `{Object | number}` (可选): SVG 属性或圆角半径
- `radius` `{number}` (可选): 圆角半径

**返回值**: `{SVGElement}` - SVG path 元素

**示例**:

```javascript
import { createLine } from "diagram-js/lib/util/RenderUtil";

// 不带圆角
const line1 = createLine([
  { x: 0, y: 0 },
  { x: 100, y: 0 },
  { x: 100, y: 100 },
]);

// 带圆角
const line2 = createLine(
  [
    { x: 0, y: 0 },
    { x: 100, y: 0 },
    { x: 100, y: 100 },
  ],
  10,
); // 10px 圆角

// 带属性和圆角
const line3 = createLine(
  [
    { x: 0, y: 0 },
    { x: 100, y: 0 },
  ],
  { stroke: "red", strokeWidth: 2 },
  5,
);
```

---

### updateLine()

**作用**: 更新已存在的线段路径。

**参数**:

- `gfx` `{SVGElement}`: SVG 路径元素
- `points` `{Point[]}`: 新的路径点

**返回值**: `{SVGElement}` - 更新后的元素

**说明**: 使用元素上存储的 `data-corner-radius` 属性值作为圆角半径。

**示例**:

```javascript
import { updateLine } from "diagram-js/lib/util/RenderUtil";

const line = createLine(oldPoints, 10);

// 更新路径点，保持圆角
updateLine(line, newPoints);
```

## 内部实现

### 圆角算法

`createLine` 使用贝塞尔曲线实现圆角：

1. 在转折点前后各取一定距离的点（取决于圆角半径）
2. 使用三次贝塞尔曲线连接这些点
3. 圆角半径自动限制在相邻线段长度的最小值之内

## 使用场景

### 绘制圆角连接线

```javascript
import { createLine } from "diagram-js/lib/util/RenderUtil";

function renderConnection(visual, connection) {
  const line = createLine(
    connection.waypoints,
    {
      stroke: "#000",
      strokeWidth: 2,
      fill: "none",
    },
    5, // 5px 圆角
  );

  svgAppend(visual, line);
}
```

### 更新连接线路径

```javascript
import { updateLine } from "diagram-js/lib/util/RenderUtil";

eventBus.on("connection.changed", function (event) {
  const connection = event.element;
  const gfx = elementRegistry.getGraphics(connection);
  const visual = getVisual(gfx);
  const path = visual.querySelector("path");

  updateLine(path, connection.waypoints);
});
```

## 相关模块

- `GraphicsFactory`: 使用 RenderUtil 绘制连接线
- `SvgTransformUtil`: 配合使用进行 SVG 变换
