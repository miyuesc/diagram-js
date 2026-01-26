# Model 工厂

Model 模块提供了创建图表元素的工厂方法和类型定义。所有图表元素都通过 `create()` 工厂方法创建。

## 模块说明

Model 模块是 diagram-js 的基础模块，定义了图表元素的数据结构和创建方法。它提供了四种基本元素类型：

- **Element**: 基础元素类型
- **Shape**: 图形元素（矩形、圆形等）
- **Connection**: 连接线元素
- **Label**: 文本标签元素
- **Root**: 根元素（特殊的 Shape）

## 模块依赖

此模块为基础模块，无外部依赖。

## TypeScript 类型

```typescript
/**
 * 基础元素接口
 */
export interface Element {
  /** 元素唯一标识符 */
  id: string;

  /** 元素类型 */
  type?: string;

  /** 绑定的业务对象 */
  businessObject?: any;

  /** 父元素 */
  parent?: Shape;

  /** 标签列表 */
  labels?: Label[];

  /** 单个标签（实际映射到 labels[0]） */
  label?: Label;

  /** 输出连接线列表 */
  outgoing?: Connection[];

  /** 输入连接线列表 */
  incoming?: Connection[];

  /** 是否被隐藏 */
  hidden?: boolean;

  /** 路径点（用于连接线） */
  waypoints?: Array<{ x: number; y: number }>;

  /** x 坐标 */
  x?: number;

  /** y 坐标 */
  y?: number;

  /** 宽度 */
  width?: number;

  /** 高度 */
  height?: number;
}

/**
 * 图形元素接口
 */
export interface Shape extends Element {
  /** x 坐标 */
  x: number;

  /** y 坐标 */
  y: number;

  /** 宽度 */
  width: number;

  /** 高度 */
  height: number;

  /** 子元素列表 */
  children?: Element[];

  /** 是否为框架元素 */
  isFrame?: boolean;

  /** 附着的宿主元素 */
  host?: Shape;

  /** 附着在此元素上的其他元素 */
  attachers?: Shape[];
}

/**
 * 根元素接口
 */
export interface Root extends Shape {
  /** 子元素列表 */
  children: Element[];
}

/**
 * 标签元素接口
 */
export interface Label extends Shape {
  /** 标签目标元素 */
  labelTarget?: Element;
}

/**
 * 连接线元素接口
 */
export interface Connection extends Element {
  /** 路径点列表 */
  waypoints: Array<{ x: number; y: number }>;

  /** 源元素 */
  source?: Element;

  /** 目标元素 */
  target?: Element;
}
```

## 公共方法

### create()

创建图表元素的工厂方法，支持四种元素类型的创建。

#### 创建根元素

**作用**: 创建一个根元素实例。

**参数**:

- `type` `{string}`: 元素类型，必须为 `'root'`
- `attrs` `{Object}` (可选): 元素属性，包括 `x`、`y`、`width`、`height` 等

**返回值**: `{Root}` - 根元素实例

**示例**:

```javascript
import * as Model from "diagram-js/lib/model";

const root = Model.create("root", {
  id: "root",
  x: 0,
  y: 0,
  width: 800,
  height: 600,
});
```

---

#### 创建图形元素

**作用**: 创建一个图形元素（Shape）实例。

**参数**:

- `type` `{string}`: 元素类型，必须为 `'shape'`
- `attrs` `{Object}` (可选): 元素属性，包括 `id`、`x`、`y`、`width`、`height` 等

**返回值**: `{Shape}` - 图形元素实例

**示例**:

```javascript
import * as Model from "diagram-js/lib/model";

const shape = Model.create("shape", {
  id: "Shape_1",
  x: 100,
  y: 100,
  width: 100,
  height: 80,
});
```

---

#### 创建连接线元素

**作用**: 创建一个连接线元素（Connection）实例。

**参数**:

- `type` `{string}`: 元素类型，必须为 `'connection'`
- `attrs` `{Object}` (可选): 元素属性，必须包括 `waypoints` 路径点数组

**返回值**: `{Connection}` - 连接线元素实例

**示例**:

```javascript
import * as Model from "diagram-js/lib/model";

const connection = Model.create("connection", {
  id: "Connection_1",
  waypoints: [
    { x: 100, y: 100 },
    { x: 200, y: 100 },
    { x: 200, y: 200 },
  ],
});
```

---

#### 创建标签元素

**作用**: 创建一个标签元素（Label）实例。

**参数**:

- `type` `{string}`: 元素类型，必须为 `'label'`
- `attrs` `{Object}` (可选): 元素属性，包括 `x`、`y`、`width`、`height`、`labelTarget` 等

**返回值**: `{Label}` - 标签元素实例

**示例**:

```javascript
import * as Model from "diagram-js/lib/model";

const label = Model.create("label", {
  id: "Label_1",
  x: 100,
  y: 100,
  width: 100,
  height: 20,
  labelTarget: shape,
});
```

---

### isModelElement()

**作用**: 检查一个对象是否为 Model 元素实例。

**参数**:

- `obj` `{any}`: 要检查的对象

**返回值**: `{boolean}` - 如果是 Model 元素返回 `true`，否则返回 `false`

**示例**:

```javascript
import * as Model from "diagram-js/lib/model";

const shape = Model.create("shape", { id: "Shape_1" });
const plainObject = { id: "NotAnElement" };

console.log(Model.isModelElement(shape)); // true
console.log(Model.isModelElement(plainObject)); // false
```

## 元素类型详解

### ElementImpl

基础元素类，所有其他元素类型的父类。

**属性**:

- `businessObject` `{Object}`: 绑定的业务对象，可写
- `label` `{Label}`: 单个标签，实际映射到 `labels[0]`
- `labels` `{Label[]}`: 标签列表
- `parent` `{Shape}`: 父元素
- `outgoing` `{Connection[]}`: 输出连接线列表
- `incoming` `{Connection[]}`: 输入连接线列表

---

### ShapeImpl

图形元素类，继承自 `ElementImpl`。

**属性**:

- `children` `{Element[]}`: 子元素列表
- `host` `{Shape}`: 附着的宿主元素
- `attachers` `{Shape[]}`: 附着在此元素上的其他元素列表
- `isFrame` `{boolean}`: 标识是否为框架元素

---

### RootImpl

根元素类，继承自 `ShapeImpl`。

**属性**:

- `children` `{Element[]}`: 子元素列表（所有顶层元素）

---

### LabelImpl

标签元素类，继承自 `ShapeImpl`。

**属性**:

- `labelTarget` `{Element}`: 标签关联的目标元素

---

### ConnectionImpl

连接线元素类，继承自 `ElementImpl`。

**属性**:

- `source` `{Element}`: 连接线的源元素
- `target` `{Element}`: 连接线的目标元素

## 元素关系

Model 模块使用 `object-refs` 库管理元素之间的引用关系，确保双向引用的一致性：

- **父子关系**: `parent` ↔ `children`
- **标签关系**: `labelTarget` ↔ `labels`
- **附着关系**: `host` ↔ `attachers`
- **连接关系**: `source` ↔ `outgoing` 和 `target` ↔ `incoming`

当修改一侧的引用时，另一侧会自动更新。例如：

```javascript
// 添加子元素
parent.children.add(child);

// child.parent 会自动设置为 parent
console.log(child.parent === parent); // true
```

## 使用建议

1. **始终使用工厂方法**: 使用 `create()` 方法创建元素，而不是直接实例化类
2. **设置唯一 ID**: 每个元素都应该有唯一的 `id` 属性
3. **使用类型检查**: 使用 `isModelElement()` 检查对象是否为有效的 Model 元素
4. **注意引用关系**: 修改 `parent`、`source`、`target` 等关系属性时，相关联的属性会自动更新
