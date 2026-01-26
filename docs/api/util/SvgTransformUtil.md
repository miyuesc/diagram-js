# SvgTransformUtil

SVG 变换工具，提供 SVG 元素的平移、旋转、缩放功能。

## 模块说明

`SvgTransformUtil` 提供了用于对 SVG 元素应用变换（transform）的工具函数。

## 模块依赖

此模块依赖 `tiny-svg` 库。

## 公共方法

### transform()

**作用**: 对 SVG 元素应用平移、旋转、缩放的组合变换。

**参数**:

- `gfx` `{SVGElement}`: SVG 元素
- `x` `{number}`: X 轴平移
- `y` `{number}`: Y 轴平移
- `angle` `{number}` (可选): 旋转角度（度）
- `amount` `{number}` (可选): 缩放比例

**示例**:

```javascript
import { transform } from "diagram-js/lib/util/SvgTransformUtil";

// 只平移
transform(gfx, 100, 50);

// 平移 + 旋转
transform(gfx, 100, 50, 45);

// 平移 + 旋转 + 缩放
transform(gfx, 100, 50, 45, 1.5);
```

---

### translate()

**作用**: 对 SVG 元素应用平移变换。

**参数**:

- `gfx` `{SVGElement}`: SVG 元素
- `x` `{number}`: X 轴平移
- `y` `{number}`: Y 轴平移

**示例**:

```javascript
import { translate } from "diagram-js/lib/util/SvgTransformUtil";

translate(gfx, 100, 50);
// transform="translate(100, 50)"
```

---

### rotate()

**作用**: 对 SVG 元素应用旋转变换。

**参数**:

- `gfx` `{SVGElement}`: SVG 元素
- `angle` `{number}`: 旋转角度（度）

**说明**: 围绕原点 (0, 0) 旋转。

**示例**:

```javascript
import { rotate } from "diagram-js/lib/util/SvgTransformUtil";

rotate(gfx, 45);
// transform="rotate(45, 0, 0)"
```

---

### scale()

**作用**: 对 SVG 元素应用缩放变换。

**参数**:

- `gfx` `{SVGElement}`: SVG 元素
- `amount` `{number}`: 缩放比例

**示例**:

```javascript
import { scale } from "diagram-js/lib/util/SvgTransformUtil";

scale(gfx, 1.5); // 放大1.5倍
scale(gfx, 0.5); // 缩小到50%
```

## 使用场景

### 图形元素定位

```javascript
import { translate } from "diagram-js/lib/util/SvgTransformUtil";

eventBus.on("shape.added", function (event) {
  const shape = event.element;
  const gfx = event.gfx;

  // 将图形移动到其位置
  translate(gfx, shape.x, shape.y);
});
```

### 旋转图标

```javascript
import { rotate } from "diagram-js/lib/util/SvgTransformUtil";

function rotateIcon(icon, degrees) {
  rotate(icon, degrees);
}
```

### 缩放预览

```javascript
import { scale } from "diagram-js/lib/util/SvgTransformUtil";

function showPreview(shape, scaleFactor) {
  const preview = createPreview(shape);
  scale(preview, scaleFactor);
  return preview;
}
```

### 组合变换

```javascript
import { transform } from "diagram-js/lib/util/SvgTransformUtil";

function positionAndRotateLabel(label, x, y, angle) {
  const gfx = elementRegistry.getGraphics(label);

  // 移动、旋转、缩放
  transform(gfx, x, y, angle, 0.9);
}
```

## 变换顺序

`transform()` 方法按以下顺序应用变换：

1. **Translate（平移）**: 先移动元素
2. **Rotate（旋转）**: 然后旋转
3. **Scale（缩放）**: 最后缩放

这个顺序很重要，因为不同顺序会产生不同结果。

## 相关模块

- `GraphicsFactory`: 使用 SvgTransformUtil 定位元素
- `RenderUtil`: 配合使用进行SVG渲染
