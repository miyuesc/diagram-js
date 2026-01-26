# GraphicsUtil

图形工具，提供快速访问 SVG 元素的语义部分的功能。

## 模块说明

`GraphicsUtil` 提供了用于访问由 `GraphicsFactory` 生成的 SVG 元素的重要部分的工具函数。

## 模块依赖

此模块为纯工具函数模块，无外部依赖。

## 公共方法

### getVisual()

**作用**: 获取图表元素的可视化部分。

**参数**:

- `gfx` `{SVGElement}`: 元素的图形容器

**返回值**: `{SVGElement}` - 可视化部分（第一个子节点）

**说明**: 返回 `<g class="djs-visual">` 元素，渲染器在此绘制内容。

**示例**:

```javascript
import { getVisual } from "diagram-js/lib/util/GraphicsUtil";

const gfx = elementRegistry.getGraphics(shape);
const visual = getVisual(gfx); // <g class="djs-visual">

// 在visual中添加SVG元素
svgAppend(visual, svgCreate("rect"));
```

---

### getChildren()

**作用**: 获取图表元素的子元素容器。

**参数**:

- `gfx` `{SVGElement}`: 元素的图形容器

**返回值**: `{SVGElement}` - 子元素容器（父节点的第二个子节点）

**说明**: 返回 `<g class="djs-children">` 元素，用于包含子元素。

**示例**:

```javascript
import { getChildren } from "diagram-js/lib/util/GraphicsUtil";

const gfx = elementRegistry.getGraphics(parent);
const childrenContainer = getChildren(gfx); // <g class="djs-children">
```

## SVG 结构说明

GraphicsFactory 创建的 SVG 结构：

```svg
<g class="djs-group">
  <!-- gfx (childNodes[0]) -->
  <g class="djs-element djs-shape">
    <!-- visual (childNodes[0]) -->
    <g class="djs-visual">
      <!-- 渲染器在这里绘制 -->
    </g>
    <!-- overlays、extensions 等 -->
  </g>

  <!-- children container (parentNode.childNodes[1]) -->
  <g class="djs-children">
    <!-- 子元素在这里 -->
  </g>
</g>
```

## 使用场景

### 自定义渲染器

```javascript
import { getVisual } from "diagram-js/lib/util/GraphicsUtil";

function renderCustomShape(gfx, element) {
  const visual = getVisual(gfx);

  // 清空visual并绘制自定义图形
  svgClear(visual);

  const rect = svgCreate("rect");
  svgAttr(rect, {
    width: element.width,
    height: element.height,
    fill: "lightblue",
  });

  svgAppend(visual, rect);
}
```

## 相关模块

- `GraphicsFactory`: 创建 SVG 结构
- `ElementRegistry`: 获取元素的图形表示
