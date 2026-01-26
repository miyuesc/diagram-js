# Elements

元素操作工具，提供元素遍历、边界框计算、闭包获取等功能。

## 模块说明

`Elements` 提供了一组用于处理图表元素的工具函数，包括元素遍历、层级关系处理、边界框计算、元素分组等功能。

## 模块依赖

此模块为纯工具函数模块，无外部依赖。

## TypeScript 类型

```typescript
/**
 * 元素闭包信息
 */
interface Closure {
  /** 所有图形元素 */
  allShapes: Record<string, Shape>;
  /** 所有连接线元素 */
  allConnections: Record<string, Connection>;
  /** 顶层元素 */
  topLevel: Record<string, Element>;
  /** 封闭的连接线 */
  enclosedConnections: Record<string, Connection>;
  /** 封闭的元素 */
  enclosedElements: Record<string, Element>;
}
```

## 公共方法

### getParents()

**作用**: 获取元素列表中的父元素（不是 其他元素子元素的元素）。

**参数**:

- `elements` `{Element[]}`: 元素列表

**返回值**: `{Element[]}` - 父元素列表

**示例**:

```javascript
import { getParents } from "diagram-js/lib/util/Elements";

const elements = [parentShape, childShape1, childShape2, otherParent];
const parents = getParents(elements); // [parentShape, otherParent]
```

---

### add()

**作用**: 向集合添加元素，可选择是否去重。

**参数**:

- `elements` `{Object[]}`: 目标集合
- `element` `{Object}`: 要添加的元素
- `unique` `{boolean}` (可选): 是否确保唯一性

**返回值**: `{boolean}` - 是否成功添加

---

### eachElement()

**作用**: 递归遍历元素及其子元素。

**参数**:

- `elements` `{Element | Element[]}`: 要遍历的元素
- `fn` `{Function}`: 迭代函数 `(element, index, depth) => Element[] | boolean | undefined`
- `depth` `{number}` (可选): 最大递归深度

**说明**: 迭代函数返回数组时，会递归遍历返回的元素。

**示例**:

```javascript
import { eachElement } from "diagram-js/lib/util/Elements";

eachElement(rootElement, function (element, index, depth) {
  console.log("深度", depth, "元素", element.id);

  // 返回子元素继续遍历
  return element.children;
});
```

---

### selfAndChildren()

**作用**: 收集元素及其子元素，可指定深度。

**参数**:

- `elements` `{Element | Element[]}`: 元素列表
- `unique` `{boolean}`: 是否去重
- `maxDepth` `{number}`: 最大深度，-1 表示无限深度

**返回值**: `{Element[]}` - 收集的元素列表

---

### selfAndDirectChildren()

**作用**: 获取元素及其直接子元素。

**参数**:

- `elements` `{Element[]}`: 元素列表
- `allowDuplicates` `{boolean}` (可选): 是否允许重复

**返回值**: `{Element[]}` - 元素及直接子元素

**示例**:

```javascript
import { selfAndDirectChildren } from "diagram-js/lib/util/Elements";

const result = selfAndDirectChildren([parent]);
// [parent, child1, child2]（不包括孙子元素）
```

---

### selfAndAllChildren()

**作用**: 获取元素及其所有后代元素。

**参数**:

- `elements` `{Element[]}`: 元素列表
- `allowDuplicates` `{boolean}` (可选): 是否允许重复

**返回值**: `{Element[]}` - 元素及所有后代

**示例**:

```javascript
import { selfAndAllChildren } from "diagram-js/lib/util/Elements";

const result = selfAndAllChildren([parent]);
// [parent, child1, child2, grandchild1, grandchild2, ...]
```

---

### getClosure()

**作用**: 获取选中元素的闭包，包括封闭的子元素和连接线。

**参数**:

- `elements` `{Element[]}`: 元素列表
- `isTopLevel` `{boolean}` (可选): 是否为顶层元素，默认 `true`
- `closure` `{Closure}` (可选): 现有闭包对象

**返回值**: `{Closure}` - 闭包信息

**说明**: 闭包包含所有图形、连接线、顶层元素等信息，用于移动或复制元素时计算影响范围。

**示例**:

```javascript
import { getClosure } from "diagram-js/lib/util/Elements";

const closure = getClosure([shape1, shape2]);
console.log(closure.allShapes); // 所有图形
console.log(closure.allConnections); // 所有连接线
console.log(closure.enclosedConnections); // 封闭的连接线
```

---

### getBBox()

**作用**: 计算元素或元素列表的包围盒。

**参数**:

- `elements` `{Element | Element[]}`: 元素或元素列表
- `stopRecursion` `{boolean}` (可选): 是否停止递归，默认 `false`

**返回值**: `{Rect}` - 边界框 `{ x, y, width, height }`

**说明**:

- 对于图形，直接使用其位置和尺寸
- 对于连接线，基于路径点计算边界框

**示例**:

```javascript
import { getBBox } from "diagram-js/lib/util/Elements";

// 单个元素
const bbox = getBBox(shape);
// { x: 100, y: 100, width: 100, height: 80 }

// 多个元素
const combinedBBox = getBBox([shape1, shape2, connection]);
// { x: 50, y: 50, width: 400, height: 300 }
```

---

### getEnclosedElements()

**作用**: 获取被边界框包围的元素。

**参数**:

- `elements` `{Element[]}`: 元素列表
- `bbox` `{Rect}`: 边界框

**返回值**: `{Element[]}` - 被包围的元素

**说明**:

- 如果 bbox.width/height 未指定，返回所有 x/y 大于 bbox.x/y 的元素
- 如果只指定 bbox.x 或 bbox.y，只比较对应维度

**示例**:

```javascript
import { getEnclosedElements } from "diagram-js/lib/util/Elements";

const enclosed = getEnclosedElements(allElements, {
  x: 100,
  y: 100,
  width: 500,
  height: 400,
});
// 返回所有在此区域内的元素
```

---

### getType()

**作用**: 获取元素的类型。

**参数**:

- `element` `{Element}`: 元素

**返回值**: `{'connection' | 'shape' | 'root'}` - 元素类型

**说明**:

- 有 `waypoints` 属性的是 connection
- 有 `x` 属性的是 shape
- 其他是 root

**示例**:

```javascript
import { getType } from "diagram-js/lib/util/Elements";

getType(shape); // 'shape'
getType(connection); // 'connection'
getType(root); // 'root'
```

---

### isFrameElement()

**作用**: 检查元素是否为框架元素。

**参数**:

- `element` `{Element}`: 元素

**返回值**: `{boolean}` - 是否为框架元素

**示例**:

```javascript
import { isFrameElement } from "diagram-js/lib/util/Elements";

isFrameElement(swimlane); // true
isFrameElement(task); // false
```

## 使用场景

### 计算选中元素的边界

```javascript
import { getBBox } from "diagram-js/lib/util/Elements";

const selectedElements = selection.get();
const bbox = getBBox(selectedElements);

// 缩放到选中区域
canvas.viewbox({
  x: bbox.x - 50,
  y: bbox.y - 50,
  width: bbox.width + 100,
  height: bbox.height + 100,
});
```

### 查找区域内的元素

```javascript
import { getEnclosedElements } from "diagram-js/lib/util/Elements";

const lassoBox = { x: 100, y: 100, width: 300, height: 200 };
const enclosedElements = getEnclosedElements(
  elementRegistry.getAll(),
  lassoBox,
);

// 选中这些元素
selection.select(enclosedElements);
```

### 获取元素及关联连接线

```javascript
import { getClosure } from "diagram-js/lib/util/Elements";

const closure = getClosure(selectedElements);

// 复制元素和相关连接线
copyPaste.copy(Object.values(closure.enclosedElements));
```

## 相关模块

- `Collections`: 提供数组操作功能
- `Geometry`: 提供几何计算功能
