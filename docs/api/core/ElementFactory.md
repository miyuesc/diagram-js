# ElementFactory

元素工厂，用于创建图表元素（Shape、Connection、Label、Root）。

## 模块说明

`ElementFactory` 是 diagram-js 中用于创建图表元素的工厂服务。它封装了 `model` 模块的 `create()` 方法，并提供了自动生成唯一ID的功能。

与直接使用 `model.create()` 相比，`ElementFactory` 的优势在于：

- **自动生成ID**: 如果未指定ID，会自动生成一个唯一的ID（格式：`{type}_{序号}`）
- **类型安全**: 提供了类型明确的便捷方法（`createShape`、`createConnection` 等）
- **依赖注入**: 作为服务注入，便于扩展和测试

## 模块依赖

此模块无外部依赖：

```javascript
// 无 $inject 属性
```

## TypeScript 类型

```typescript
import type { Element, Connection, Label, Root, Shape } from "../model/Types";

/**
 * 元素工厂类，支持泛型以允许自定义元素类型
 * @template T - Connection 类型，默认为 Connection
 * @template U - Label 类型，默认为 Label
 * @template V - Root 类型，默认为 Root
 * @template W - Shape 类型，默认为 Shape
 */
class ElementFactory<
  T extends Connection = Connection,
  U extends Label = Label,
  V extends Root = Root,
  W extends Shape = Shape,
> {
  // ...
}
```

## 私有属性

### \_uid

**类型**: `number`

**说明**: ID序号计数器，用于生成唯一的元素ID。初始值为 `12`，每次自动生成ID时递增。

## 公共方法

### createRoot()

**作用**: 创建一个根元素（Root）。

**参数**:

- `attrs` `{Partial<Root>}` (可选): 根元素的属性

**返回值**: `{Root}` - 创建的根元素实例

**说明**: 如果未指定 `id`，会自动生成格式为 `root_{序号}` 的ID。

**示例**:

```javascript
const elementFactory = diagram.get("elementFactory");

// 自动生成ID
const root = elementFactory.createRoot();
// { id: 'root_12', ... }

// 指定ID和属性
const customRoot = elementFactory.createRoot({
  id: "MyRoot",
  x: 0,
  y: 0,
  width: 1000,
  height: 800,
});
```

---

### createShape()

**作用**: 创建一个图形元素（Shape）。

**参数**:

- `attrs` `{Partial<Shape>}` (可选): 图形元素的属性，包括 `x`、`y`、`width`、`height` 等

**返回值**: `{Shape}` - 创建的图形元素实例

**说明**: 如果未指定 `id`，会自动生成格式为 `shape_{序号}` 的ID。

**示例**:

```javascript
const elementFactory = diagram.get("elementFactory");

// 自动生成ID
const shape = elementFactory.createShape({
  x: 100,
  y: 100,
  width: 100,
  height: 80,
});
// { id: 'shape_13', x: 100, y: 100, width: 100, height: 80 }

// 指定ID和类型
const customShape = elementFactory.createShape({
  id: "Task_1",
  type: "bpmn:Task",
  x: 200,
  y: 200,
  width: 100,
  height: 80,
});
```

---

### createConnection()

**作用**: 创建一个连接线元素（Connection）。

**参数**:

- `attrs` `{Partial<Connection>}` (可选): 连接线的属性，通常包括 `waypoints`、`source`、`target` 等

**返回值**: `{Connection}` - 创建的连接线实例

**说明**: 如果未指定 `id`，会自动生成格式为 `connection_{序号}` 的ID。

**示例**:

```javascript
const elementFactory = diagram.get("elementFactory");

// 创建简单连接线
const connection = elementFactory.createConnection({
  waypoints: [
    { x: 100, y: 100 },
    { x: 300, y: 200 },
  ],
});
// { id: 'connection_14', waypoints: [...] }

// 创建带源和目标的连接线
const sequenceFlow = elementFactory.createConnection({
  id: "SequenceFlow_1",
  type: "bpmn:SequenceFlow",
  source: sourceShape,
  target: targetShape,
  waypoints: [
    { x: 200, y: 140 },
    { x: 300, y: 140 },
  ],
});
```

---

### createLabel()

**作用**: 创建一个标签元素（Label）。

**参数**:

- `attrs` `{Partial<Label>}` (可选): 标签的属性，包括 `x`、`y`、`width`、`height`、`labelTarget` 等

**返回值**: `{Label}` - 创建的标签实例

**说明**: 如果未指定 `id`，会自动生成格式为 `label_{序号}` 的ID。

**示例**:

```javascript
const elementFactory = diagram.get("elementFactory");

// 创建独立标签
const label = elementFactory.createLabel({
  x: 150,
  y: 180,
  width: 100,
  height: 20,
});
// { id: 'label_15', x: 150, y: 180, width: 100, height: 20 }

// 创建关联到元素的标签
const taskLabel = elementFactory.createLabel({
  id: "Task_1_label",
  labelTarget: task,
  x: 150,
  y: 180,
  width: 100,
  height: 20,
});
```

---

### create()

**作用**: 通用的元素创建方法，根据类型创建不同的元素。

**参数**:

- `type` `{'root' | 'shape' | 'connection' | 'label'}`: 元素类型
- `attrs` `{Object}` (可选): 元素属性

**返回值**: `{Element}` - 创建的元素实例（具体类型取决于 `type` 参数）

**说明**:

- 这是底层方法，其他 `createXxx()` 方法都是调用此方法
- 如果未指定 `id`，会自动生成格式为 `{type}_{序号}` 的ID
- 会复制 `attrs` 对象，避免修改原始对象

**示例**:

```javascript
const elementFactory = diagram.get('elementFactory');

// 创建不同类型的元素
const root = elementFactory.create('root');
const shape = elementFactory.create('shape', { x: 100, y: 100 });
const connection = elementFactory.create('connection', { waypoints: [...] });
const label = elementFactory.create('label', { x: 150, y: 180 });
```

## 内部实现细节

### ID 生成机制

`ElementFactory` 维护一个内部计数器 `_uid`，初始值为 `12`。每次调用 `create()` 方法且未指定ID时：

```javascript
if (!attrs.id) {
  attrs.id = type + "_" + this._uid++;
}
```

生成的ID格式：

- 根元素: `root_12`, `root_13`, ...
- 图形: `shape_12`, `shape_13`, ...
- 连接线: `connection_12`, `connection_13`, ...
- 标签: `label_12`, `label_13`, ...

### 属性复制

`create()` 方法会复制传入的 `attrs` 对象：

```javascript
attrs = assign({}, attrs || {});
```

这确保了不会修改原始的属性对象，避免意外的副作用。

## 使用建议

1. **优先使用 ElementFactory**: 在需要创建元素时，使用 `elementFactory` 而不是直接调用 `model.create()`
2. **为重要元素指定ID**: 虽然会自动生成ID，但对于有业务意义的元素，建议指定有意义的ID
3. **使用类型专用方法**: 优先使用 `createShape()`、`createConnection()` 等方法，而不是通用的 `create()` 方法
4. **设置必要属性**:
   - Shape 和 Label 需要设置 `x`、`y`、`width`、`height`
   - Connection 需要设置 `waypoints`
   - Label 通常需要设置 `labelTarget`

## 典型用法

### 创建基本图形

```javascript
const elementFactory = diagram.get("elementFactory");
const canvas = diagram.get("canvas");

// 创建根元素
const root = elementFactory.createRoot();
canvas.setRootElement(root);

// 创建图形
const task = elementFactory.createShape({
  id: "Task_1",
  type: "bpmn:Task",
  x: 100,
  y: 100,
  width: 100,
  height: 80,
});

canvas.addShape(task, root);
```

### 创建连接线

```javascript
const source = elementFactory.createShape({
  id: "Source",
  x: 100,
  y: 100,
  width: 100,
  height: 80,
});

const target = elementFactory.createShape({
  id: "Target",
  x: 300,
  y: 100,
  width: 100,
  height: 80,
});

const connection = elementFactory.createConnection({
  id: "Flow_1",
  type: "bpmn:SequenceFlow",
  source: source,
  target: target,
  waypoints: [
    { x: 200, y: 140 },
    { x: 300, y: 140 },
  ],
});

canvas.addConnection(connection, root);
```

## 相关模块

- `model`: ElementFactory 底层使用 model.create() 创建元素
- `Canvas`: 创建元素后通常需要通过 Canvas 添加到画布
- `ElementRegistry`: Canvas 添加元素时会自动注册到 ElementRegistry
