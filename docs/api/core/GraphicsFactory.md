# GraphicsFactory

图形工厂，用于创建和管理元素的 SVG 图形表示。

## 模块说明

`GraphicsFactory` 负责为图表元素创建、更新和移除 SVG 图形表示。它管理 SVG DOM 结构，并通过事件总线委托实际的渲染工作给渲染器。

### SVG 结构

GraphicsFactory 为每个元素创建以下 SVG 结构：

```svg
<g class="djs-group">
  <!-- 元素图形容器 -->
  <g class="djs-element djs-(shape|connection|frame)">
    <!-- 可视化部分（渲染器在这里绘制） -->
    <g class="djs-visual">
      <!-- SVG 图形元素 -->
    </g>
    <!-- 扩展部分（overlays、click box 等） -->
  </g>

  <!-- 子元素容器 -->
  <g class="djs-children"></g>
</g>
```

## 模块依赖

基于 `$inject` 属性，此模块依赖：

```javascript
GraphicsFactory.$inject = ["eventBus", "elementRegistry"];
```

- `eventBus` `{EventBus}`: 事件总线，用于触发渲染事件
- `elementRegistry` `{ElementRegistry}`: 元素注册表，用于获取元素的图形表示

## TypeScript 类型

```typescript
import type { ElementLike, ShapeLike, ConnectionLike } from "./Types";
import type { EventBus } from "./EventBus";
import type { ElementRegistry } from "./ElementRegistry";
```

## 私有属性

### \_eventBus

**类型**: `EventBus`

**说明**: 事件总线实例的引用。

### \_elementRegistry

**类型**: `ElementRegistry`

**说明**: 元素注册表实例的引用。

## 私有方法

### \_getChildrenContainer()

**作用**: 获取元素的子元素容器（`<g class="djs-children">`）。

**参数**:

- `element` `{Object}`: 元素对象，需要包含 `parent` 属性

**返回值**: `{SVGElement}` - 子元素容器的 SVG 元素

**说明**:

- 对于根元素（无 parent），返回元素自身的图形
- 对于其他元素，返回或创建 `djs-children` 容器

---

### \_clear()

**作用**: 清空元素的可视化部分，返回清空后的 visual 元素。

**参数**:

- `gfx` `{SVGElement}`: 元素的图形容器

**返回值**: `{SVGElement}` - 清空后的 `<g class="djs-visual">` 元素

**说明**: 移除 visual 容器中的所有子元素，用于重绘前的清理。

---

### \_createContainer()

**作用**: 为元素创建 SVG 容器结构。

**参数**:

- `type` `{string}`: 元素类型，如 `'shape'`、`'connection'`
- `childrenGfx` `{SVGElement}`: 父元素的子元素容器
- `parentIndex` `{number}` (可选): 在父容器中的插入位置
- `isFrame` `{boolean}` (可选): 是否为框架元素

**返回值**: `{SVGElement}` - 创建的 `<g class="djs-element">` 元素

**说明**:

- 创建完整的 SVG 容器结构（outer group + element group + visual group）
- 为框架元素添加 `djs-frame` 类
- 支持指定插入位置

## 公共方法

### create()

**作用**: 为元素创建图形表示。

**参数**:

- `type` `{'shape' | 'connection' | 'label' | 'root'}`: 元素类型
- `element` `{ElementLike}`: 元素对象
- `parentIndex` `{number}` (可选): 在父容器中的插入位置索引

**返回值**: `{SVGElement}` - 创建的图形元素

**示例**:

```javascript
const graphicsFactory = diagram.get("graphicsFactory");

// 创建图形
const gfx = graphicsFactory.create("shape", shape);

// 指定插入位置
const gfx = graphicsFactory.create("shape", shape, 0); // 插入到第一个位置
```

---

### update()

**作用**: 更新元素的图形表示。

**参数**:

- `type` `{'shape' | 'connection'}`: 元素类型
- `element` `{ElementLike}`: 元素对象
- `gfx` `{SVGElement}`: 元素的图形容器

**说明**:

- 清空并重绘元素
- 对于 shape，更新位置（translate）
- 处理 `hidden` 属性（设置 display 样式）
- 根元素不会被更新

**示例**:

```javascript
const graphicsFactory = diagram.get("graphicsFactory");
const elementRegistry = diagram.get("elementRegistry");

const gfx = elementRegistry.getGraphics(shape);

// 更新图形
graphicsFactory.update("shape", shape, gfx);
```

---

### remove()

**作用**: 移除元素的图形表示。

**参数**:

- `element` `{ElementLike}`: 要移除图形的元素

**说明**: 从 DOM 中移除整个 `djs-group` 容器。

**示例**:

```javascript
const graphicsFactory = diagram.get("graphicsFactory");

graphicsFactory.remove(shape);
```

---

### drawShape()

**作用**: 绘制形状的视觉表示。

**参数**:

- `visual` `{SVGElement}`: visual 容器元素
- `element` `{ShapeLike}`: 形状元素
- `attrs` `{Object}` (可选): 额外的属性

**返回值**: `{SVGElement}` - 渲染结果

**说明**:

- 触发 `render.shape` 事件，由渲染器处理实际的绘制
- 返回值由渲染器决定

**示例**:

```javascript
const graphicsFactory = diagram.get("graphicsFactory");
const visual = elementRegistry.getGraphics(shape).querySelector(".djs-visual");

graphicsFactory.drawShape(visual, shape, {
  fill: "red",
  stroke: "black",
});
```

---

### drawConnection()

**作用**: 绘制连接线的视觉表示。

**参数**:

- `visual` `{SVGElement}`: visual 容器元素
- `element` `{ConnectionLike}`: 连接线元素
- `attrs` `{Object}` (可选): 额外的属性

**返回值**: `{SVGElement}` - 渲染结果

**说明**:

- 触发 `render.connection` 事件，由渲染器处理实际的绘制
- 返回值由渲染器决定

**示例**:

```javascript
const graphicsFactory = diagram.get("graphicsFactory");
const visual = elementRegistry
  .getGraphics(connection)
  .querySelector(".djs-visual");

graphicsFactory.drawConnection(visual, connection, {
  stroke: "blue",
  strokeWidth: 2,
});
```

---

### getShapePath()

**作用**: 获取形状的 SVG 路径。

**参数**:

- `element` `{ShapeLike}`: 形状元素

**返回值**: `{string}` - SVG 路径字符串

**说明**: 触发 `render.getShapePath` 事件，由渲染器返回路径。

**示例**:

```javascript
const graphicsFactory = diagram.get("graphicsFactory");

const path = graphicsFactory.getShapePath(shape);
// 返回类似 "M 0 0 L 100 0 L 100 80 L 0 80 Z"
```

---

### getConnectionPath()

**作用**: 获取连接线的 SVG 路径。

**参数**:

- `connection` `{ConnectionLike}`: 连接线元素

**返回值**: `{string}` - SVG 路径字符串

**说明**: 触发 `render.getConnectionPath` 事件，由渲染器返回路径。

**示例**:

```javascript
const graphicsFactory = diagram.get("graphicsFactory");

const path = graphicsFactory.getConnectionPath(connection);
// 返回基于 waypoints 的路径
```

---

### updateContainments()

**作用**: 更新多个元素的包含关系，重新排列它们在 DOM 中的顺序。

**参数**:

- `elements` `{ElementLike[]}`: 元素数组

**说明**:

- 收集所有受影响的父元素
- 按模型中的顺序重新排列子元素的 SVG 节点
- 确保 SVG DOM 顺序与模型顺序一致（影响元素的层叠顺序）

**示例**:

```javascript
const graphicsFactory = diagram.get("graphicsFactory");

// 移动元素后更新层叠顺序
graphicsFactory.updateContainments([shape1, shape2, shape3]);
```

## 渲染事件

GraphicsFactory 通过事件总线触发以下渲染事件：

### render.shape

**触发时机**: 需要绘制形状时

**参数**:

- `gfx` `{SVGElement}`: visual 容器
- `element` `{ShapeLike}`: 形状元素
- `attrs` `{Object}`: 额外属性

**返回值**: 渲染器应返回绘制的 SVG 元素

---

### render.connection

**触发时机**: 需要绘制连接线时

**参数**:

- `gfx` `{SVGElement}`: visual 容器
- `element` `{ConnectionLike}`: 连接线元素
- `attrs` `{Object}`: 额外属性

**返回值**: 渲染器应返回绘制的 SVG 元素

---

### render.getShapePath

**触发时机**: 需要获取形状路径时

**参数**:

- `element` `{ShapeLike}`: 形状元素

**返回值**: 渲染器应返回 SVG 路径字符串

---

### render.getConnectionPath

**触发时机**: 需要获取连接线路径时

**参数**:

- `connection` `{ConnectionLike}`: 连接线元素

**返回值**: 渲染器应返回 SVG 路径字符串

## CSS 类说明

GraphicsFactory 创建的 SVG 元素使用以下 CSS 类：

- `djs-group`: 外层容器组
- `djs-element`: 元素图形容器
- `djs-shape`: 形状元素
- `djs-connection`: 连接线元素
- `djs-frame`: 框架元素
- `djs-visual`: 可视化容器（渲染器在此绘制）
- `djs-children`: 子元素容器

## 使用建议

1. **不要直接操作 SVG DOM**: 使用 GraphicsFactory 的方法而不是直接操作 SVG
2. **通过渲染器绘制**: 实现渲染器来响应 `render.*` 事件，而不是直接调用 `drawShape/drawConnection`
3. **更新后刷新**: 修改元素属性后，调用 `update()` 刷新图形
4. **注意层叠顺序**: 使用 `updateContainments()` 确保 DOM 顺序正确

## 典型用法

### 自定义渲染器

```javascript
function CustomRenderer(eventBus) {
  // 渲染形状
  eventBus.on("render.shape", 1500, function (event) {
    const { gfx, element } = event;

    if (element.type === "custom:Shape") {
      const rect = svgCreate("rect");
      svgAttr(rect, {
        x: 0,
        y: 0,
        width: element.width,
        height: element.height,
        fill: "lightblue",
        stroke: "navy",
      });

      svgAppend(gfx, rect);

      return rect;
    }
  });

  // 获取形状路径
  eventBus.on("render.getShapePath", 1500, function (element) {
    if (element.type === "custom:Shape") {
      return `M 0 0 L ${element.width} 0 L ${element.width} ${element.height} L 0 ${element.height} Z`;
    }
  });
}

CustomRenderer.$inject = ["eventBus"];
```

## 相关模块

- `ElementRegistry`: 存储元素与图形的映射关系
- `Canvas`: 使用 GraphicsFactory 创建和更新元素图形
- `BaseRenderer` / `DefaultRenderer`: 实现渲染事件的处理
