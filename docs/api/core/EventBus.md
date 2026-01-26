# EventBus

事件总线，用于在 diagram-js 实例中进行跨组件通信。

## 模块说明

`EventBus` 是 diagram-js 的核心通信机制，所有的交互、状态变更和组件间通信都通过事件总线进行。它实现了观察者模式，允许组件监听和触发事件。

### 核心特性

- **优先级支持**: 监听器可以指定优先级（数值越大优先级越高）
- **事件传播控制**: 支持停止传播和阻止默认行为
- **错误处理**: 内置错误处理机制
- **一次性监听**: 支持 `once()` 方法注册一次性监听器
- **批量注册**: 可以一次性注册多个事件

## 模块依赖

此模块无外部依赖：

```javascript
// 无 $inject 属性
```

## TypeScript 类型

```typescript
/**
 * 事件对象接口
 */
interface Event {
  /** 事件类型 */
  type?: string;

  /** 停止事件传播 */
  stopPropagation(): void;

  /** 阻止默认行为 */
  preventDefault(): void;

  /** 是否已取消冒泡 */
  cancelBubble: boolean;

  /** 是否已阻止默认行为 */
  defaultPrevented: boolean;

  /** 返回值 */
  returnValue: any;
}

/**
 * 事件回调函数
 * @template E - 事件数据类型
 */
type EventBusEventCallback<E> = (event: E & Event, ...args: any[]) => any;

/**
 * 事件监听器内部结构
 */
interface EventBusListener {
  /** 优先级 */
  priority: number;

  /** 下一个监听器（链表结构） */
  next: EventBusListener | null;

  /** 回调函数 */
  callback: EventBusEventCallback<any>;
}
```

## 私有属性

### \_listeners

**类型**: `Record<string, EventBusListener>`

**说明**: 存储所有事件监听器的对象，使用事件名作为键，监听器链表作为值。监听器按优先级排序（高优先级在前）。

## 私有方法

### \_destroy()

**作用**: 清理所有事件监听器。

**说明**: 在 `diagram.destroy` 事件触发时自动调用，清空 `_listeners` 对象。

---

### \_invokeListeners()

**作用**: 调用监听器链表中的所有监听器。

**参数**:

- `event` `{Event}`: 事件对象
- `args` `{any[]}`: 传递给监听器的参数数组
- `listener` `{EventBusListener}`: 第一个监听器

**返回值**: `{any}` - 最后一个监听器的返回值

**说明**: 按顺序调用监听器链表，直到事件被停止传播或链表结束。

---

### \_invokeListener()

**作用**: 调用单个监听器。

**参数**:

- `event` `{Event}`: 事件对象
- `args` `{any[]}`: 传递给监听器的参数数组
- `listener` `{EventBusListener}`: 要调用的监听器

**返回值**: `{any}` - 监听器的返回值

**说明**:

- 如果返回值不是 `undefined`，会停止事件传播
- 如果返回值是 `false`，会阻止默认行为
- 捕获并处理监听器中的错误

---

### \_addListener()

**作用**: 添加新的监听器到监听器链表中。

**参数**:

- `event` `{string}`: 事件名称
- `newListener` `{EventBusListener}`: 新的监听器对象

**说明**: 监听器按优先级排序插入，相同优先级的监听器按注册顺序排列（先注册先执行）。

---

### \_removeListener()

**作用**: 从监听器链表中移除监听器。

**参数**:

- `event` `{string}`: 事件名称
- `callback` `{Function}` (可选): 要移除的回调函数，如果不提供则移除该事件的所有监听器

**说明**: 通过比较回调函数引用来查找和移除监听器。

---

### \_getListeners()

**作用**: 获取指定事件的监听器链表。

**参数**:

- `name` `{string}`: 事件名称

**返回值**: `{EventBusListener}` - 监听器链表的头节点

---

### \_setListeners()

**作用**: 设置指定事件的监听器链表。

**参数**:

- `name` `{string}`: 事件名称
- `listener` `{EventBusListener}`: 监听器链表的头节点

## 公共方法

### on()

**作用**: 注册事件监听器。

**参数**:

- `events` `{string | string[]}`: 要监听的事件名称或事件名称数组
- `priority` `{number}` (可选): 优先级，默认为 `1000`，数值越大优先级越高
- `callback` `{EventBusEventCallback}`: 回调函数
- `that` `{any}` (可选): 回调函数的 `this` 上下文

**说明**:

- 回调函数的第一个参数是事件对象，后续参数是 `fire()` 传递的额外参数
- 返回 `false` 会阻止默认行为
- 返回非 `undefined` 值会停止事件传播
- 相同优先级的监听器按注册顺序执行

**示例**:

```javascript
const eventBus = diagram.get("eventBus");

// 基本用法
eventBus.on("element.click", function (event) {
  console.log("元素被点击:", event.element);
});

// 带优先级
eventBus.on("element.move", 1500, function (event) {
  console.log("高优先级监听器");
});

// 带上下文
eventBus.on(
  "foo",
  function (event) {
    this.doSomething();
  },
  this,
);

// 监听多个事件
eventBus.on(["element.added", "element.removed"], function (event) {
  console.log("元素变化:", event.type);
});

// 带额外参数
eventBus.on("custom.event", function (event, param1, param2) {
  console.log(param1, param2);
});

// 控制事件传播
eventBus.on("element.delete", function (event) {
  // 停止传播
  event.stopPropagation();

  // 阻止默认行为
  event.preventDefault();

  // 或者直接返回 false
  return false;
});
```

---

### once()

**作用**: 注册一次性事件监听器，触发一次后自动移除。

**参数**:

- `events` `{string | string[]}`: 要监听的事件名称或事件名称数组
- `priority` `{number}` (可选): 优先级，默认为 `1000`
- `callback` `{EventBusEventCallback}`: 回调函数
- `that` `{any}` (可选): 回调函数的 `this` 上下文

**示例**:

```javascript
const eventBus = diagram.get("eventBus");

// 只监听一次
eventBus.once("diagram.init", function (event) {
  console.log("图表已初始化");
});

// 带优先级
eventBus.once("element.added", 1500, function (event) {
  console.log("第一个元素被添加");
});
```

---

### off()

**作用**: 移除事件监听器。

**参数**:

- `events` `{string | string[]}`: 要移除监听器的事件名称或事件名称数组
- `callback` `{EventBusEventCallback}` (可选): 要移除的回调函数，如果不提供则移除该事件的所有监听器

**示例**:

```javascript
const eventBus = diagram.get("eventBus");

function handler(event) {
  console.log("处理事件");
}

// 注册监听器
eventBus.on("foo", handler);

// 移除特定监听器
eventBus.off("foo", handler);

// 移除事件的所有监听器
eventBus.off("foo");

// 移除多个事件的监听器
eventBus.off(["foo", "bar"], handler);
```

---

### fire()

**作用**: 触发事件。

**参数**:

- `type` `{string}`: 事件类型
- `data` `{Object}` (可选): 事件数据对象
- `...args` `{any[]}`: 传递给监听器的额外参数

**返回值**: `{any}` - 监听器的返回值，如果默认行为被阻止则返回 `false`

**说明**:

- 如果第一个参数是对象且包含 `type` 属性，则作为事件对象
- 事件对象会作为第一个参数传递给所有监听器
- 额外参数会依次传递给监听器

**示例**:

```javascript
const eventBus = diagram.get("eventBus");

// 基本用法
eventBus.fire("foo");

// 带数据
eventBus.fire("element.moved", {
  element: shape,
  delta: { x: 10, y: 20 },
});

// 使用事件对象
const event = { type: "foo", data: "bar" };
eventBus.fire(event);

// 显式指定类型
eventBus.fire("element.updated", { x: 100, y: 200 });

// 传递额外参数
eventBus.fire("custom.event", {}, "param1", "param2");

// 检查默认行为是否被阻止
if (eventBus.fire("element.delete", { element: shape }) === false) {
  console.log("删除被阻止");
}
```

---

### createEvent()

**作用**: 创建一个事件总线可以识别的事件对象。

**参数**:

- `data` `{Object}`: 事件数据

**返回值**: `{Event}` - 事件对象

**示例**:

```javascript
const eventBus = diagram.get("eventBus");

const event = eventBus.createEvent({
  type: "custom.event",
  element: shape,
  data: "some data",
});

// 手动触发事件
eventBus.fire(event);
```

---

### handleError()

**作用**: 通过触发 `error` 事件来处理错误。

**参数**:

- `error` `{Error}`: 要处理的错误对象

**返回值**: `{boolean}` - 如果错误被处理（有监听器阻止了默认行为）返回 `true`，否则返回 `false`

**说明**: 如果没有监听器处理错误，错误会被打印到控制台并重新抛出。

**示例**:

```javascript
const eventBus = diagram.get("eventBus");

// 注册错误处理器
eventBus.on("error", function (event) {
  console.error("捕获到错误:", event.error);

  // 阻止默认行为（避免错误被重新抛出）
  return false;
});

// 在监听器中触发错误会被自动处理
eventBus.on("foo", function () {
  throw new Error("Something went wrong");
});

eventBus.fire("foo"); // 错误会被捕获并通过 error 事件处理
```

## 常见事件

diagram-js 中的常见事件类型：

### 元素事件

- `element.add` / `element.added`: 元素添加前/后
- `element.remove` / `element.removed`: 元素移除前/后
- `element.changed`: 元素发生变化
- `element.updateId`: 元素ID更新
- `element.click`: 元素被点击
- `element.dblclick`: 元素被双击
- `element.hover`: 鼠标悬停在元素上
- `element.out`: 鼠标离开元素

### 形状事件

- `shape.add` / `shape.added`: 形状添加前/后
- `shape.remove` / `shape.removed`: 形状移除前/后
- `shape.move` / `shape.moved`: 形状移动前/后

### 连接线事件

- `connection.add` / `connection.added`: 连接线添加前/后
- `connection.remove` / `connection.removed`: 连接线移除前/后

### 命令事件

- `commandStack.execute`: 命令执行
- `commandStack.changed`: 命令栈变化
- `commandStack.reverted`: 命令被撤销
- `commandStack.revert`: 命令撤销前

### 画布事件

- `canvas.viewbox.changed`: 视口变化
- `canvas.resized`: 画布大小改变
- `diagram.init`: 图表初始化
- `diagram.destroy`: 图表销毁

## 事件命名约定

diagram-js 使用以下事件命名约定：

- **前缀事件**: 如 `element.add`，在操作执行前触发，可以被阻止
- **后缀事件**: 如 `element.added`，在操作执行后触发，不可被阻止
- **点分隔**: 使用 `.` 分隔命名空间，如 `canvas.viewbox.changed`

## 优先级说明

- 默认优先级: `1000`
- 高优先级: `> 1000`（通常用于验证和拦截）
- 低优先级: `< 1000`（通常用于清理和日志记录）
- 最低优先级: `1`（用于最后执行的清理操作）

## 使用建议

1. **使用描述性事件名**: 使用清晰的命名约定，如 `module.action.status`
2. **谨慎使用高优先级**: 只在必要时使用高优先级，避免破坏执行顺序
3. **及时清理监听器**: 组件销毁时使用 `off()` 移除监听器，避免内存泄漏
4. **错误处理**: 为监听器添加错误处理逻辑，或注册全局 `error` 事件监听器
5. **避免在监听器中修改全局状态**: 优先使用命令模式进行状态修改

## 典型用法

### 监听元素点击

```javascript
eventBus.on("element.click", function (event) {
  const element = event.element;
  console.log("点击了元素:", element.id);
});
```

### 验证操作

```javascript
// 使用高优先级在操作前进行验证
eventBus.on("shape.move", 1500, function (event) {
  const shape = event.shape;

  if (!canMove(shape)) {
    // 阻止移动
    return false;
  }
});
```

### 操作后处理

```javascript
// 使用低优先级在操作后进行处理
eventBus.on("shape.moved", 500, function (event) {
  const shape = event.shape;
  console.log("形状已移动到:", shape.x, shape.y);

  // 执行清理或更新操作
  updateRelatedElements(shape);
});
```

## 相关模块

- `CommandStack`: 使用 EventBus 触发命令执行事件
- `Canvas`: 使用 EventBus 触发画布和元素事件
- 所有 Features: 各功能模块都通过 EventBus 进行通信
