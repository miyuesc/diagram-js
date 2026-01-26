# Cursor

光标工具，提供设置页面光标样式的功能。

## 模块说明

`Cursor` 提供了用于在页面 body 元素上设置和管理光标样式的工具函数，通过添加/移除 CSS 类来实现。

## 模块依赖

此模块为纯工具函数模块，无外部依赖。

## 公共方法

### set()

**作用**: 设置光标模式。

**参数**:

- `mode` `{string}`: 光标模式名称

**说明**:

- 在 body 元素上添加 `djs-cursor-{mode}` 类
- 移除之前设置的所有 `djs-cursor-*` 类

**示例**:

```javascript
import { set } from "diagram-js/lib/util/Cursor";

// 设置移动光标
set("move"); // body.className 包含 'djs-cursor-move'

// 设置调整光标
set("resize"); // body.className 包含 'djs-cursor-resize'
```

---

### unset()

**作用**: 取消光标模式，恢复默认光标。

**示例**:

```javascript
import { unset } from "diagram-js/lib/util/Cursor";

unset(); // 移除所有 djs-cursor-* 类
```

---

### has()

**作用**: 检查是否设置了指定的光标模式。

**参数**:

- `mode` `{string}`: 光标模式名称

**返回值**: `{boolean}` - 是否设置了该模式

**示例**:

```javascript
import { has } from "diagram-js/lib/util/Cursor";

set("move");
has("move"); // true
has("resize"); // false
```

## CSS 类名

Cursor 工具期望对应的 CSS 类已定义：

```css
.djs-cursor-move {
  cursor: move;
}

.djs-cursor-resize {
  cursor: nwse-resize;
}

.djs-cursor-crosshair {
  cursor: crosshair;
}

.djs-cursor-grab {
  cursor: grab;
}

.djs-cursor-grabbing {
  cursor: grabbing;
}
```

## 使用建议

1. **配合工具使用**: 在激活工具时设置光标，工具停用时取消
2. **定义CSS类**: 确保定义了所需的光标CSS类
3. **及时清理**: 操作完成后调用 `unset()` 恢复默认光标

## 典型用法

### 在拖拽工具中使用

```javascript
import { set, unset } from "diagram-js/lib/util/Cursor";

// 拖拽开始
eventBus.on("drag.start", function () {
  set("grabbing");
});

// 拖拽移动
eventBus.on("drag.move", function () {
  set("move");
});

// 拖拽结束
eventBus.on("drag.end", function () {
  unset();
});
```

### 在手形工具中使用

```javascript
import { set, unset } from "diagram-js/lib/util/Cursor";

class HandTool {
  toggle(active) {
    if (active) {
      set("grab");
    } else {
      unset();
    }
  }
}
```

## 相关模块

- `HandTool`: 使用 Cursor 工具设置手形光标
- `Move`: 使用 Cursor 工具设置移动光标
