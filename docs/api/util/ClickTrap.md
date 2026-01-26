# ClickTrap

点击陷阱工具，用于防止拖拽操作后的幽灵点击事件。

## 模块说明

`ClickTrap` 提供了一个工具函数，用于在拖拽操作后临时阻止点击事件，防止"幽灵点击"（ghost click）问题。

### 什么是幽灵点击？

在触摸设备或某些拖拽操作后，浏览器可能会触发一个意外的点击事件。ClickTrap 通过临时注册一个高优先级的事件监听器来捕获并阻止这个事件。

## 模块依赖

```typescript
- eventBus {EventBus}: 事件总线
```

## 公共方法

### install()

**作用**: 安装点击陷阱，阻止下一次指定事件的触发。

**参数**:

- `eventBus` `{EventBus}`: 事件总线实例
- `eventName` `{string}` (可选): 要阻止的事件名，默认为 `'element.click'`

**返回值**: `{Function}` - 用于立即移除陷阱的函数

**说明**:

- 使用非常高的优先级（5000）确保在其他监听器之前执行
- 只阻止一次事件（使用 `eventBus.once`）
- 返回的函数可用于提前移除陷阱

**示例**:

```javascript
import { install } from "diagram-js/lib/util/ClickTrap";

// 在拖拽结束时安装陷阱
eventBus.on("drag.end", function () {
  install(eventBus);
});
```

---

### 高级用法 - 提前移除

```javascript
import { install } from "diagram-js/lib/util/ClickTrap";

// 安装陷阱并获取移除函数
const removeTrap = install(eventBus, "element.dblclick");

// 某些条件下提前移除
if (someCondition) {
  removeTrap();
}
```

## 内部实现

```javascript
// 陷阱优先级
const TRAP_PRIORITY = 5000;

function install(eventBus, eventName) {
  eventName = eventName || "element.click";

  function trap() {
    return false; // 阻止事件
  }

  // 高优先级一次性监听
  eventBus.once(eventName, TRAP_PRIORITY, trap);

  // 返回移除函数
  return function () {
    eventBus.off(eventName, trap);
  };
}
```

## 使用场景

### 防止拖拽后的误点击

```javascript
import { install } from "diagram-js/lib/util/ClickTrap";

class DraggingBehavior {
  constructor(eventBus) {
    this._eventBus = eventBus;

    eventBus.on("drag.end", () => {
      // 防止拖拽结束时触发点击事件
      install(eventBus);
    });
  }
}
```

### 防止双击后的单击

```javascript
import { install } from "diagram-js/lib/util/ClickTrap";

eventBus.on("element.dblclick", function () {
  // 双击时执行操作
  openEditor();

  // 防止双击触发后续的单击事件
  install(eventBus, "element.click");
});
```

## 优先级说明

ClickTrap 使用优先级 5000，确保在大多数业务逻辑（默认优先级 1000）之前执行。这样可以有效拦截并阻止事件传播。

## 使用建议

1. **仅在必要时使用**: 只在确实需要防止幽灵点击时使用
2. **拖拽后使用**: 最常见的使用场景是拖拽操作结束后
3. **考虑副作用**: 使用陷阱会阻止一次合法的事件，确保这是预期行为

## 相关模块

- `Dragging`: 拖拽功能可能在结束时使用 ClickTrap
- `Move`: 移动功能可能使用 ClickTrap 防止误点击
