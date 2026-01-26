# ElementRegistry

元素注册表，用于跟踪和管理图表中的所有元素及其图形表示。

## 模块说明

`ElementRegistry` 是 diagram-js 的核心服务之一，负责维护元素ID与元素对象、SVG图形之间的映射关系。它提供了添加、删除、查询元素的方法，是访问图表元素的主要入口。

每个元素在注册表中存储时，会关联以下信息：

- 元素对象（element）
- 主图形元素（gfx）- SVG `<g>` 元素
- 次要图形元素（secondaryGfx）- 可选，用于某些特殊渲染需求

## 模块依赖

基于 `$inject` 属性，此模块依赖：

```javascript
ElementRegistry.$inject = ["eventBus"];
```

- `eventBus` `{EventBus}`: 事件总线，用于触发元素ID更新事件

## TypeScript 类型

```typescript
import type { ElementLike } from "./Types";
import type { EventBus } from "./EventBus";

/**
 * 元素过滤回调函数
 * @param element 元素对象
 * @param gfx SVG 图形元素
 * @returns 返回 true 表示匹配，false 表示不匹配
 */
type ElementRegistryFilterCallback = (
  element: ElementLike,
  gfx: SVGElement,
) => boolean | any;

/**
 * 元素遍历回调函数
 * @param element 元素对象
 * @param gfx SVG 图形元素
 */
type ElementRegistryForEachCallback = (
  element: ElementLike,
  gfx: SVGElement,
) => any;
```

## 私有属性

### \_elements

**类型**: `{ [id: string]: { element: ElementLike; gfx?: SVGElement; secondaryGfx?: SVGElement } }`

**说明**: 内部存储对象，使用元素ID作为键，存储元素及其图形表示的映射关系。

### \_eventBus

**类型**: `EventBus`

**说明**: 事件总线实例的引用。

## 私有方法

### \_validateId()

**作用**: 验证元素ID的有效性，确保ID存在且未被使用。

**参数**:

- `id` `{string}`: 要验证的元素ID

**抛出异常**:

- 如果ID为空，抛出错误: `'element must have an id'`
- 如果ID已存在，抛出错误: `'element with id ' + id + ' already added'`

**示例**:

```javascript
// 内部调用
this._validateId("Shape_1"); // 如果ID已存在，抛出异常
```

## 公共方法

### add()

**作用**: 将元素及其图形表示添加到注册表中。

**参数**:

- `element` `{ElementLike}`: 要添加的元素对象，必须包含 `id` 属性
- `gfx` `{SVGElement}`: 元素的主图形表示（SVG `<g>` 元素）
- `secondaryGfx` `{SVGElement}` (可选): 元素的次要图形表示

**说明**:

- 将在 SVG 元素上设置 `data-element-id` 属性
- 如果元素ID已存在，会抛出异常

**示例**:

```javascript
const shape = elementFactory.createShape({ id: "Shape_1" });
const gfx = graphicsFactory.create("shape", shape);

elementRegistry.add(shape, gfx);
```

---

### remove()

**作用**: 从注册表中移除元素。

**参数**:

- `element` `{ElementLike | string}`: 要移除的元素对象或元素ID

**说明**:

- 会清除 SVG 元素上的 `data-element-id` 属性
- 如果元素不存在，不会抛出异常

**示例**:

```javascript
// 通过元素对象移除
elementRegistry.remove(shape);

// 通过元素ID移除
elementRegistry.remove("Shape_1");
```

---

### updateId()

**作用**: 更新元素的ID。

**参数**:

- `element` `{ElementLike | string}`: 要更新的元素对象或当前ID
- `newId` `{string}`: 新的元素ID

**说明**:

- 会触发 `element.updateId` 事件
- 内部会先移除旧注册，更新元素ID，然后重新注册
- 如果新ID已被使用，会抛出异常

**事件**:

- `element.updateId` - 参数: `{ element, newId }`

**示例**:

```javascript
// 通过元素对象更新
elementRegistry.updateId(shape, "Shape_2");

// 通过元素ID更新
elementRegistry.updateId("Shape_1", "Shape_2");
```

---

### updateGraphics()

**作用**: 更新元素的图形表示。

**参数**:

- `filter` `{ElementLike | string}`: 元素对象或元素ID
- `gfx` `{SVGElement}`: 新的图形元素
- `secondary` `{boolean}` (可选): 是否更新次要图形表示，默认为 `false`

**返回值**: `{SVGElement}` - 返回新设置的图形元素

**说明**: 会在新图形元素上设置 `data-element-id` 属性

**示例**:

```javascript
const newGfx = graphicsFactory.create("shape", shape);

// 更新主图形
elementRegistry.updateGraphics("Shape_1", newGfx);

// 更新次要图形
elementRegistry.updateGraphics(shape, newGfx, true);
```

---

### get()

**作用**: 根据ID或图形元素获取元素对象。

**参数**:

- `filter` `{string | SVGElement}`: 元素ID或SVG图形元素

**返回值**: `{ElementLike | undefined}` - 返回元素对象，如果不存在返回 `undefined`

**示例**:

```javascript
// 通过ID获取
const shape = elementRegistry.get("Shape_1");

// 通过图形元素获取
const element = elementRegistry.get(gfx);
```

---

### filter()

**作用**: 返回所有匹配过滤函数的元素。

**参数**:

- `fn` `{ElementRegistryFilterCallback}`: 过滤函数，接收元素和图形作为参数

**返回值**: `{ElementLike[]}` - 匹配的元素数组

**示例**:

```javascript
// 查找所有Shape类型的元素
const shapes = elementRegistry.filter((element, gfx) => {
  return element.type === "shape";
});

// 查找所有宽度大于100的元素
const largeElements = elementRegistry.filter((element) => {
  return element.width && element.width > 100;
});
```

---

### find()

**作用**: 返回第一个匹配过滤函数的元素。

**参数**:

- `fn` `{ElementRegistryFilterCallback}`: 过滤函数，接收元素和图形作为参数

**返回值**: `{ElementLike | undefined}` - 第一个匹配的元素，如果没有匹配返回 `undefined`

**示例**:

```javascript
// 查找第一个Shape类型的元素
const firstShape = elementRegistry.find((element) => {
  return element.type === "shape";
});

// 查找指定业务对象的元素
const element = elementRegistry.find((element) => {
  return element.businessObject === someBusinessObject;
});
```

---

### getAll()

**作用**: 获取所有已注册的元素。

**返回值**: `{ElementLike[]}` - 所有元素的数组

**示例**:

```javascript
const allElements = elementRegistry.getAll();
console.log("图表中共有 " + allElements.length + " 个元素");
```

---

### forEach()

**作用**: 对每个元素执行给定的函数。

**参数**:

- `fn` `{ElementRegistryForEachCallback}`: 要执行的函数，接收元素和图形作为参数

**示例**:

```javascript
// 打印所有元素的ID
elementRegistry.forEach((element, gfx) => {
  console.log("元素ID:", element.id);
});

// 修改所有Shape的颜色
elementRegistry.forEach((element, gfx) => {
  if (element.type === "shape") {
    gfx.style.fill = "red";
  }
});
```

---

### getGraphics()

**作用**: 获取元素的图形表示。

**参数**:

- `filter` `{ElementLike | string}`: 元素对象或元素ID
- `secondary` `{boolean}` (可选): 是否获取次要图形表示，默认为 `false`

**返回值**: `{SVGElement}` - 元素的图形表示

**示例**:

```javascript
// 获取主图形
const gfx = elementRegistry.getGraphics("Shape_1");

// 获取次要图形（通常是根元素的<svg>元素）
const rootGfx = elementRegistry.getGraphics(rootElement); // <g>元素
const rootSvg = elementRegistry.getGraphics(rootElement, true); // <svg>元素
```

## 内部实现细节

### 元素ID属性

`ElementRegistry` 使用 `data-element-id` 属性在 SVG 元素上存储元素ID，这使得：

- 可以从 SVG 元素反向查找对应的元素对象
- 便于调试和开发者工具检查

### 存储结构

内部使用对象字面量 `_elements` 存储映射关系：

```javascript
{
  'Shape_1': {
    element: { id: 'Shape_1', ... },
    gfx: <SVGGElement>,
    secondaryGfx: undefined
  },
  'Connection_1': {
    element: { id: 'Connection_1', ... },
    gfx: <SVGGElement>,
    secondaryGfx: undefined
  }
}
```

## 使用建议

1. **不要直接修改 \_elements**: 始终使用公共方法操作注册表
2. **使用 get() 验证元素存在**: 在操作元素前，先用 `get()` 验证元素是否存在
3. **善用 filter() 和 find()**: 这些方法比手动遍历 `getAll()` 更高效
4. **注意 updateId() 的副作用**: 更新ID会触发事件，可能影响其他模块

## 相关模块

- `Canvas`: 使用 ElementRegistry 管理画布上的元素
- `ElementFactory`: 创建元素后需要注册到 ElementRegistry
- `GraphicsFactory`: 创建图形表示后需要注册到 ElementRegistry
