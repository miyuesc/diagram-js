# Canvas

画布服务，diagram-js 的核心绘图区域，负责元素的添加、移除、渲染和视图管理。

## 模块说明

`Canvas` 是 diagram-js 最核心的服务之一，它管理整个图表的绘图区域，包括：

- SVG 容器的创建和管理
- 元素的添加和移除
- 图层（Layer）管理
- 视口（Viewport）和缩放管理
- 根元素（Root Element）管理
- 标记（Marker）管理

## 模块依赖

基于 `$inject` 属性，此模块依赖：

```javascript
Canvas.$inject = [
  "config.canvas",
  "eventBus",
  "graphicsFactory",
  "elementRegistry",
];
```

- `config.canvas` `{CanvasConfig}`: 画布配置对象
- `eventBus` `{EventBus}`: 事件总线
- `graphicsFactory` `{GraphicsFactory}`: 图形工厂
- `elementRegistry` `{ElementRegistry}`: 元素注册表

## TypeScript 类型

```typescript
/**
 * 画布配置
 */
interface CanvasConfig {
  /** 容器元素 */
  container?: HTMLElement;
  /** 是否延迟更新 viewbox 变更事件 */
  deferUpdate?: boolean;
  /** 画布宽度 */
  width?: number;
  /** 画布高度 */
  height?: number;
  /** 是否自动聚焦 */
  autoFocus?: boolean;
}

/**
 * 视口信息
 */
interface CanvasViewbox extends Rect {
  /** 缩放比例 */
  scale: number;
  /** 内部尺寸 */
  inner: Rect;
  /** 外部尺寸 */
  outer: Dimensions;
}

/**
 * 图层信息
 */
interface CanvasLayer {
  /** SVG 组元素 */
  group: SVGElement;
  /** 图层索引 */
  index: number;
  /** 是否可见 */
  visible: boolean;
}
```

## DOM 结构

Canvas 创建以下 DOM 结构：

```html
<div class="djs-container djs-parent">
  <svg width="100%" height="100%">
    <g class="viewport">
      <g class="layer-base">
        <!-- 元素在这里渲染 -->
      </g>
      <!-- 其他图层 -->
    </g>
  </svg>
</div>
```

## 公共方法

### 元素操作

#### addShape()

**作用**: 添加一个图形元素到画布。

**参数**:

- `shape` `{ShapeLike}`: 要添加的图形
- `parent` `{ParentLike}` (可选): 父元素，默认为根元素
- `parentIndex` `{number}` (可选): 在父元素children中的索引位置

**返回值**: `{ShapeLike}` - 已添加的图形

**事件**:

- `shape.add` - 添加前触发
- `shape.added` - 添加后触发

**示例**:

```javascript
const canvas = diagram.get("canvas");
const shape = elementFactory.createShape({
  x: 100,
  y: 100,
  width: 100,
  height: 80,
});

canvas.addShape(shape); // 添加到根元素
canvas.addShape(childShape, parentShape); // 添加到指定父元素
```

---

#### addConnection()

**作用**: 添加连接线到画布。

**参数**:

- `connection` `{ConnectionLike}`: 要添加的连接线
- `parent` `{ParentLike}` (可选): 父元素
- `parentIndex` `{number}` (可选): 插入位置

**返回值**: `{ConnectionLike}` - 已添加的连接线

---

#### removeShape()

**作用**: 从画布移除图形元素。

**参数**:

- `shape` `{ShapeLike | string}`: 图形对象或ID

**返回值**: `{ShapeLike}` - 已移除的图形

---

#### removeConnection()

**作用**: 从画布移除连接线。

**参数**:

- `connection` `{ConnectionLike | string}`: 连接线对象或ID

**返回值**: `{ConnectionLike}` - 已移除的连接线

### 根元素管理

#### getRootElement()

**作用**: 获取当前活动的根元素。

**返回值**: `{RootLike}` - 当前根元素

**说明**: 如果没有根元素，会自动创建一个隐式根元素。

---

#### setRootElement()

**作用**: 设置当前活动的根元素。

**参数**:

- `rootElement` `{RootLike}`: 要设置的根元素

**返回值**: `{RootLike}` - 设置的根元素

---

#### addRootElement()

**作用**: 添加一个新的根元素。

**参数**:

- `rootElement` `{RootLike}` (可选): 根元素，如不提供则创建隐式根元素

**返回值**: `{RootLike}` - 添加的根元素

---

#### removeRootElement()

**作用**: 移除根元素。

**参数**:

- `rootElement` `{RootLike | string}`: 根元素或ID

**返回值**: `{RootLike}` - 已移除的根元素

---

#### getRootElements()

**作用**: 获取所有根元素列表。

**返回值**: `{RootLike[]}` - 根元素数组

### 图层管理

#### getLayer()

**作用**: 获取或创建指定名称的图层。

**参数**:

- `name` `{string}`: 图层名称
- `index` `{number}` (可选): 图层索引

**返回值**: `{SVGElement}` - 图层的 SVG 元素

**示例**:

```javascript
const overlayLayer = canvas.getLayer("overlays", 10);
```

---

#### getDefaultLayer()

**作用**: 获取默认图层（base层）。

**返回值**: `{SVGElement}` - 默认图层元素

---

#### showLayer()

**作用**: 显示指定图层。

**参数**:

- `name` `{string}`: 图层名称

**返回值**: `{SVGElement}` - 图层元素

---

#### hideLayer()

**作用**: 隐藏指定图层。

**参数**:

- `name` `{string}`: 图层名称

**返回值**: `{SVGElement}` - 图层元素

### 标记管理

#### addMarker()

**作用**: 为元素添加标记（CSS 类名）。

**参数**:

- `element` `{ElementLike | string}`: 元素或ID
- `marker` `{string}`: 标记名称

**示例**:

```javascript
canvas.addMarker(shape, "selected");
canvas.addMarker(shape, "error");
```

---

#### removeMarker()

**作用**: 从元素移除标记。

**参数**:

- `element` `{ElementLike | string}`: 元素或ID
- `marker` `{string}`: 标记名称

---

#### hasMarker()

**作用**: 检查元素是否有指定标记。

**参数**:

- `element` `{ElementLike | string}`: 元素或ID
- `marker` `{string}`: 标记名称

**返回值**: `{boolean}` - 是否有该标记

---

#### toggleMarker()

**作用**: 切换元素的标记状态。

**参数**:

- `element` `{ElementLike | string}`: 元素或ID
- `marker` `{string}`: 标记名称

### 视图管理

#### viewbox()

**作用**: 获取或设置画布的视口区域。

**用法1 - 获取**: `viewbox()` 或 `viewbox(false)` 强制重新计算

**返回值**: `{CanvasViewbox}` - 视口信息

**用法2 - 设置**: `viewbox(box)`

**参数**:

- `box` `{Rect}`: 视口区域 `{ x, y, width, height }`

**示例**:

```javascript
// 获取视口
const vb = canvas.viewbox();
console.log(vb); // { x, y, width, height, scale, inner, outer }

// 设置视口
canvas.viewbox({ x: 100, y: 100, width: 800, height: 600 });
```

---

#### scroll()

**作用**: 滚动画布。

**参数**:

- `delta` `{ScrollDelta}`: 滚动增量 `{ dx, dy }`

**示例**:

```javascript
canvas.scroll({ dx: 100, dy: 50 });
```

---

#### scrollToElement()

**作用**: 滚动画布使元素可见。

**参数**:

- `element` `{ElementLike}`: 要显示的元素
- `padding` `{number | RectTRBL}` (可选): 边距

---

#### zoom()

**作用**: 获取或设置缩放级别。

**用法1 - 获取**: `zoom()`

**返回值**: `{number}` - 当前缩放比例

**用法2 - 设置**: `zoom(newScale)` 或 `zoom(newScale, center)`

**参数**:

- `newScale` `{number | 'fit-viewport'}`: 新缩放比例或 'fit-viewport'
- `center` `{Point}` (可选): 缩放中心点

**示例**:

```javascript
// 获取缩放
const scale = canvas.zoom(); // 1.0

// 设置缩放
canvas.zoom(1.5); // 放大到150%
canvas.zoom(0.5, { x: 400, y: 300 }); // 以指定点为中心缩小

// 适应视口
canvas.zoom("fit-viewport");
```

---

#### resized()

**作用**: 通知画布容器尺寸已改变。

**说明**: 当容器大小改变时调用此方法，触发 `canvas.resized` 事件。

### 其他方法

#### getContainer()

**作用**: 获取画布的 HTML 容器元素。

**返回值**: `{HTMLElement}` - 容器元素

---

#### getGraphics()

**作用**: 获取元素的图形表示。

**参数**:

- `element` `{ElementLike | string}`: 元素或ID
- `secondary` `{boolean}` (可选): 是否获取次要图形

**返回值**: `{SVGElement}` - 图形元素

---

#### getAbsoluteBBox()

**作用**: 获取元素的绝对边界框。

**参数**:

- `element` `{ElementLike}`: 元素

**返回值**: `{Rect}` - 边界框

---

#### findRoot()

**作用**: 查找元素所属的根元素。

**参数**:

- `element` `{ElementLike | string}`: 元素或ID

**返回值**: `{RootLike}` - 根元素

---

#### focus()

**作用**: 使画布获得焦点。

---

#### isFocused()

**作用**: 检查画布是否已聚焦。

**返回值**: `{boolean}` - 是否聚焦

## 图层索引

Canvas 使用两个预定义的图层索引：

- `PLANE_LAYER_INDEX = 0`: 平面图层索引（渲染元素）
- `UTILITY_LAYER_INDEX = 1`: 工具图层索引（overlays、decorators等）

## 常见事件

- `canvas.init`: 画布初始化完成
- `canvas.destroy`: 画布销毁
- `canvas.viewbox.changing`: 视口即将改变
- `canvas.viewbox.changed`: 视口已改变
- `canvas.resized`: 画布尺寸改变
- `canvas.focus.changed`: 焦点状态改变
- `shape.add` / `shape.added`: 图形添加前/后
- `connection.add` / `connection.added`: 连接线添加前/后
- `shape.remove` / `shape.removed`: 图形移除前/后
- `connection.remove` / `connection.removed`: 连接线移除前/后
- `element.marker.update`: 元素标记更新

## 使用建议

1. **使用 Canvas 添加元素**: 不要直接使用 GraphicsFactory，通过 Canvas 方法添加元素
2. **管理根元素**: 对于多页/多画布应用，合理使用根元素切换功能
3. **使用图层组织内容**: 将不同类型的视觉元素放在不同图层
4. **监听视口事件**: 在视口变化时更新相关UI
5. **合理使用标记**: 用标记而不是直接修改SVG类名

## 典型用法

### 基本元素添加

```javascript
const canvas = diagram.get("canvas");
const elementFactory = diagram.get("elementFactory");

// 设置根元素
const root = elementFactory.createRoot();
canvas.setRootElement(root);

// 添加图形
const shape = elementFactory.createShape({
  id: "Shape_1",
  x: 100,
  y: 100,
  width: 100,
  height: 80,
});
canvas.addShape(shape);

// 添加连接线
const connection = elementFactory.createConnection({
  id: "Flow_1",
  waypoints: [
    { x: 200, y: 140 },
    { x: 400, y: 140 },
  ],
});
canvas.addConnection(connection);
```

### 视口操作

```javascript
// 缩放到适应所有元素
canvas.zoom("fit-viewport");

// 滚动到特定元素
canvas.scrollToElement(shape);

// 设置特定视口
canvas.viewbox({ x: 0, y: 0, width: 1000, height: 800 });
```

### 标记使用

```javascript
// 高亮选中的元素
canvas.addMarker(shape, "selected");
canvas.addMarker(shape, "highlight");

// 移除标记
canvas.removeMarker(shape, "selected");

// 切换标记
canvas.toggleMarker(shape, "error");
```

## 相关模块

- `ElementRegistry`: Canvas 使用它注册元素
- `GraphicsFactory`: Canvas 使用它创建和更新图形
- `EventBus`: Canvas 触发各种画布和元素事件
