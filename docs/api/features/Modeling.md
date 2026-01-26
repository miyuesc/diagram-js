# Modeling

建模服务，提供图表元素的创建、修改、删除等核心建模操作。

## 模块说明

`Modeling` 是 diagram-js 最核心的服务，它封装了所有的建模操作（如移动、调整大小、创建、删除元素等），并通过 `CommandStack` 执行这些操作，确保所有变更都可撤销和重做。

### 核心特性

- **可撤销操作**: 所有操作通过 CommandStack 执行，支持撤销/重做
- **丰富的 API**: 提供 20+ 个建模方法
- **命令处理器**: 为每种操作注册专门的命令处理器
- **事件触发**: 操作过程中触发相应的生命周期事件
- **提示支持**: 所有方法支持 hints 参数传递额外信息

## 模块依赖

```javascript
Modeling.$inject = ["eventBus", "elementFactory", "commandStack"];
```

- `eventBus` `{EventBus}`: 事件总线
- `elementFactory` `{ElementFactory}`: 元素工厂
- `commandStack` `{CommandStack}`: 命令栈

## 公共方法概览

### 图形操作

- `createShape()` - 创建图形
- `moveShape()` - 移动图形
- `resizeShape()` - 调整图形大小
- `removeShape()` - 删除图形
- `replaceShape()` - 替换图形
- `appendShape()` - 创建并连接图形
- `toggleCollapse()` - 折叠/展开图形

### 连接线操作

- `createConnection()` / `connect()` - 创建连接线
- `moveConnection()` - 移动连接线
- `removeConnection()` - 删除连接线
- `updateWaypoints()` - 更新路径点
- `reconnect()` / `reconnectStart()` / `reconnectEnd()` - 重新连接
- `layoutConnection()` - 布局连接线

### 批量操作

- `createElements()` - 创建多个元素
- `moveElements()` - 移动多个元素
- `removeElements()` - 删除多个元素
- `alignElements()` - 对齐元素
- `distributeElements()` - 分布元素

### 其他操作

- `createLabel()` - 创建标签
- `updateAttachment()` - 更新附着
- `createSpace()` - 创建空间

## 详细方法文档

### createShape()

**作用**: 创建一个新图形。

**参数**:

- `shape` `{Partial<Shape>}`: 图形属性
- `position` `{Point}`: 位置 `{x, y}`
- `target` `{Parent}`: 父元素
- `parentIndex` `{number}` (可选): 插入位置
- `hints` `{Object}` (可选): 提示信息

**返回值**: `{Shape}` - 创建的图形

**示例**:

```javascript
const modeling = diagram.get("modeling");

// 创建图形
const shape = modeling.createShape(
  { type: "custom:Task", width: 100, height: 80 },
  { x: 200, y: 200 },
  rootElement,
);

// 创建附着元素
const boundaryEvent = modeling.createShape(
  { type: "custom:BoundaryEvent", width: 36, height: 36 },
  { x: task.x + task.width, y: task.y + task.height / 2 },
  task,
  { attach: true },
);
```

---

### moveShape()

**作用**: 移动图形。

**参数**:

- `shape` `{Shape}`: 要移动的图形
- `delta` `{Point}`: 移动偏移量 `{x, y}`
- `newParent` `{Parent}` (可选): 新的父元素
- `newParentIndex` `{number}` (可选): 新位置索引
- `hints` `{Object}` (可选): 提示信息

**示例**:

```javascript
// 移动图形
modeling.moveShape(shape, { x: 50, y: 30 });

// 移动到新父元素
modeling.moveShape(shape, { x: 0, y: 0 }, newParent);
```

---

### resizeShape()

**作用**: 调整图形大小。

**参数**:

- `shape` `{Shape}`: 要调整的图形
- `newBounds` `{Rect}`: 新的边界 `{x, y, width, height}`
- `minBounds` `{Dimensions}` (可选): 最小尺寸
- `hints` `{Object}` (可选): 提示信息

**示例**:

```javascript
modeling.resizeShape(shape, {
  x: shape.x,
  y: shape.y,
  width: 150,
  height: 100,
});
```

---

### removeShape() / removeElements()

**作用**: 删除图形或多个元素。

**示例**:

```javascript
// 删除单个图形
modeling.removeShape(shape);

// 删除多个元素
modeling.removeElements([shape1, shape2, connection1]);
```

---

### createConnection() / connect()

**作用**: 创建连接线。

**参数**:

- `source` `{Element}`: 源元素
- `target` `{Element}`: 目标元素
- `attrs` `{Partial<Connection>}`: 连接线属性
- `parent` `{Parent}`: 父元素
- `hints` `{Object}` (可选): 提示信息

**返回值**: `{Connection}` - 创建的连接线

**示例**:

```javascript
// 简单连接
const connection = modeling.connect(source, target);

// 带属性的连接
const connection = modeling.createConnection(
  source,
  target,
  { type: "custom:SequenceFlow" },
  rootElement,
);
```

---

### updateWaypoints()

**作用**: 更新连接线的路径点。

**参数**:

- `connection` `{Connection}`: 连接线
- `newWaypoints` `{Point[]}`: 新的路径点
- `hints` `{Object}` (可选): 提示信息

**示例**:

```javascript
const newWaypoints = [
  { x: 100, y: 100 },
  { x: 200, y: 100 },
  { x: 200, y: 200 },
  { x: 300, y: 200 },
];

modeling.updateWaypoints(connection, newWaypoints);
```

---

### reconnect() / reconnectStart() / reconnectEnd()

**作用**: 重新连接连接线的源或目标。

**示例**:

```javascript
// 重新连接源
modeling.reconnectStart(connection, newSource, { x: 100, y: 100 });

// 重新连接目标
modeling.reconnectEnd(connection, newTarget, { x: 300, y: 200 });

// 同时重新连接源和目标
modeling.reconnect(connection, newSource, newTarget, [
  { x: 100, y: 100 },
  { x: 200, y: 150 },
  { x: 300, y: 200 },
]);
```

---

### appendShape()

**作用**: 创建图形并连接到源元素。

**参数**:

- `source` `{Element}`: 源元素
- `shape` `{Partial<Shape>}`: 新图形属性
- `position` `{Point}`: 位置
- `target` `{Parent}`: 父元素
- `hints` `{Object}` (可选): 提示信息（可包含 `connection` 和 `connectionParent`）

**返回值**: `{Shape}` - 创建的图形

**示例**:

```javascript
const newTask = modeling.appendShape(
  currentTask,
  { type: "custom:Task", width: 100, height: 80 },
  { x: 300, y: 200 },
  rootElement,
  {
    connection: { type: "custom:SequenceFlow" },
  },
);
```

---

### moveElements()

**作用**: 移动多个元素。

**参数**:

- `elements` `{Element[]}`: 要移动的元素
- `delta` `{Point}`: 移动偏移量
- `target` `{Parent}` (可选): 新的父元素
- `hints` `{Object}` (可选): 提示信息

**示例**:

```javascript
// 批量移动
modeling.moveElements(selectedElements, { x: 50, y: 30 });

// 移动到新父元素
modeling.moveElements(elements, { x: 0, y: 0 }, newParent);
```

---

### alignElements()

**作用**: 对齐多个元素。

**参数**:

- `elements` `{Element[]}`: 要对齐的元素
- `alignment` `{Object}`: 对齐方式

**对齐选项**:

- `left`: 左对齐
- `center`: 水平居中
- `right`: 右对齐
- `top`: 顶部对齐
- `middle`: 垂直居中
- `bottom`: 底部对齐

**示例**:

```javascript
// 左对齐
modeling.alignElements(elements, { left: true });

// 水平和垂直居中
modeling.alignElements(elements, { center: true, middle: true });
```

---

### distributeElements()

**作用**: 均匀分布元素。

**参数**:

- `groups` `{Array}`: 分布组
- `axis` `{'x' | 'y'}`: 分布轴
- `dimension` `{'width' | 'height'}`: 分布维度

**示例**:

```javascript
const groups = [
  {
    elements: elements,
    range: { min: 0, max: 500 },
  },
];

// 水平均匀分布
modeling.distributeElements(groups, "x", "width");
```

---

### replaceShape()

**作用**: 替换图形。

**参数**:

- `oldShape` `{Shape}`: 要替换的图形
- `newShape` `{Partial<Shape>}`: 新图形属性
- `hints` `{Object}` (可选): 提示信息

**返回值**: `{Shape}` - 新图形

**示例**:

```javascript
const newShape = modeling.replaceShape(oldTask, {
  type: "custom:ServiceTask",
  width: 100,
  height: 80,
});
```

---

### createLabel()

**作用**: 创建标签。

**参数**:

- `labelTarget` `{Element}`: 标签的目标元素
- `position` `{Point}`: 位置
- `label` `{Partial<Label>}`: 标签属性
- `parent` `{Parent}` (可选): 父元素

**返回值**: `{Label}` - 创建的标签

---

### layoutConnection()

**作用**: 重新布局连接线。

**参数**:

- `connection` `{Connection}`: 连接线
- `hints` `{Object}` (可选): 提示信息

**示例**:

```javascript
// 自动布局连接线
modeling.layoutConnection(connection);
```

---

### createSpace()

**作用**: 创建空间（用于 Space Tool）。

**参数**:

- `movingShapes` `{Shape[]}`: 要移动的图形
- `resizingShapes` `{Shape[]}`: 要调整大小的图形
- `delta` `{Point}`: 偏移量
- `direction` `{Direction}`: 方向
- `start` `{number}`: 起始位置

## 命令处理器

Modeling 注册了以下命令处理器：

- `shape.create` - CreateShapeHandler
- `shape.move` - MoveShapeHandler
- `shape.resize` - ResizeShapeHandler
- `shape.delete` - DeleteShapeHandler
- `shape.replace` - ReplaceShapeHandler
- `shape.append` - AppendShapeHandler
- `shape.toggleCollapse` - ToggleShapeCollapseHandler
- `connection.create` - CreateConnectionHandler
- `connection.move` - MoveConnectionHandler
- `connection.delete` - DeleteConnectionHandler
- `connection.layout` - LayoutConnectionHandler
- `connection.updateWaypoints` - UpdateWaypointsHandler
- `connection.reconnect` - ReconnectConnectionHandler
- `elements.create` - CreateElementsHandler
- `elements.move` - MoveElementsHandler
- `elements.delete` - DeleteElementsHandler
- `elements.align` - AlignElementsHandler
- `elements.distribute` - DistributeElementsHandler
- `label.create` - CreateLabelHandler
- `element.updateAttachment` - UpdateAttachmentHandler
- `spaceTool` - SpaceToolHandler

## Hints 参数

大多数方法支持 `hints` 参数来传递额外信息：

```javascript
{
  attach: true,           // 是否附着到目标
  connection: {...},      // 连接线配置
  connectionParent: parent, // 连接线父元素
  // ... 其他自定义提示
}
```

## 使用建议

1. **始终使用 Modeling**: 不要直接修改元素属性，使用 Modeling 方法
2. **检查返回值**: 某些方法返回创建的元素，可以继续操作
3. **使用 hints**: 通过 hints 传递特定行为标志
4. **监听事件**: 通过 CommandStack 事件监听操作

## 相关模块

- `CommandStack`: Modeling 底层使用命令栈
- `ElementFactory`: 创建元素时使用
- `Rules`: 验证操作是否允许
- `CommandInterceptor`: 扩展命令执行逻辑
