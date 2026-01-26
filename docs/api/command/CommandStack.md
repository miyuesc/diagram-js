# CommandStack

命令栈，提供可撤销/重做的命令执行机制。

## 模块说明

`CommandStack` 是 diagram-js 的核心服务，负责以可撤销和重做的方式执行建模操作。它将实际的命令执行委托给 `CommandHandler`，并管理撤销/重做栈。

### 核心特性

- **撤销/重做**: 所有命令都可以撤销和重做
- **命令处理器**: 通过注册处理器来定义命令行为
- **生命周期事件**: 在执行各阶段触发事件
- **变更追踪**: 自动追踪所有受影响的元素
- **原子操作**: 保证命令执行的原子性

## 模块依赖

```javascript
CommandStack.$inject = ["eventBus", "injector"];
```

- `eventBus` `{EventBus}`: 事件总线
- `injector` `{Injector}`: 依赖注入器

## 公共方法

### execute()

**作用**: 执行一个命令。

**参数**:

- `command` `{string}`: 命令名称
- `context` `{CommandContext}`: 命令上下文对象

**说明**: 执行命令并将其添加到撤销栈中。

**示例**:

```javascript
const commandStack = diagram.get("commandStack");

commandStack.execute("shape.move", {
  shape: shape,
  delta: { x: 100, y: 50 },
});

commandStack.execute("shape.create", {
  shape: newShape,
  parent: root,
  position: { x: 200, y: 200 },
});
```

---

### canExecute()

**作用**: 检查命令是否可以执行。

**参数**:

- `command` `{string}`: 命令名称
- `context` `{CommandContext}`: 命令上下文对象

**返回值**: `{boolean}` - 是否可以执行

**说明**:

- 触发 `canExecute` 事件
- 调用处理器的 `canExecute()` 方法
- 可以通过事件监听器或处理器阻止执行

**示例**:

```javascript
if (commandStack.canExecute("shape.delete", { shape })) {
  commandStack.execute("shape.delete", { shape });
} else {
  console.log("无法删除该图形");
}
```

---

### undo()

**作用**: 撤销最后执行的命令。

**说明**: 如果最后的命令是一组原子操作，会一次性全部撤销。

**示例**:

```javascript
commandStack.undo();
```

---

### redo()

**作用**: 重做上一次撤销的命令。

**说明**: 如果上次撤销的是一组原子操作，会一次性全部重做。

**示例**:

```javascript
commandStack.redo();
```

---

### canUndo()

**作用**: 检查是否可以撤销。

**返回值**: `{boolean}` - 是否可以撤销

**示例**:

```javascript
const undoButton = document.getElementById("undo");
undoButton.disabled = !commandStack.canUndo();
```

---

### canRedo()

**作用**: 检查是否可以重做。

**返回值**: `{boolean}` - 是否可以重做

**示例**:

```javascript
const redoButton = document.getElementById("redo");
redoButton.disabled = !commandStack.canRedo();
```

---

### clear()

**作用**: 清空命令栈，删除所有撤销/重做历史。

**参数**:

- `emit` `{boolean}` (可选): 是否触发事件，默认 `true`

**示例**:

```javascript
commandStack.clear(); // 清空并触发 changed 事件
commandStack.clear(false); // 静默清空
```

---

### register()

**作用**: 注册命令处理器实例。

**参数**:

- `command` `{string}`: 命令名称
- `handler` `{CommandHandler}`: 处理器实例

**示例**:

```javascript
const handler = {
  execute: function (context) {
    // 执行逻辑
    return [context.shape];
  },
  revert: function (context) {
    // 撤销逻辑
    return [context.shape];
  },
};

commandStack.register("custom.command", handler);
```

---

### registerHandler()

**作用**: 注册命令处理器类，自动实例化并注入依赖。

**参数**:

- `command` `{string}`: 命令名称
- `handlerCls` `{CommandHandlerConstructor}`: 处理器类

**示例**:

```javascript
class MoveShapeHandler {
  constructor(canvas, modeling) {
    this._canvas = canvas;
    this._modeling = modeling;
  }

  execute(context) {
    const shape = context.shape;
    const delta = context.delta;

    context.oldPosition = { x: shape.x, y: shape.y };
    shape.x += delta.x;
    shape.y += delta.y;

    return [shape];
  }

  revert(context) {
    const shape = context.shape;
    shape.x = context.oldPosition.x;
    shape.y = context.oldPosition.y;

    return [shape];
  }
}

MoveShapeHandler.$inject = ["canvas", "modeling"];

commandStack.registerHandler("shape.move", MoveShapeHandler);
```

## 生命周期事件

CommandStack 在命令执行过程中触发以下事件：

### 执行阶段

1. `commandStack.{command}.canExecute` / `commandStack.canExecute`
2. `commandStack.{command}.preExecute` / `commandStack.preExecute`
3. `commandStack.{command}.preExecuted` / `commandStack.preExecuted`
4. `commandStack.{command}.execute` / `commandStack.execute`
5. `commandStack.{command}.executed` / `commandStack.executed`
6. `commandStack.{command}.postExecute` / `commandStack.postExecute`
7. `commandStack.{command}.postExecuted` / `commandStack.postExecuted`

### 撤销阶段

1. `commandStack.{command}.revert` / `commandStack.revert`
2. `commandStack.{command}.reverted` / `commandStack.reverted`

### 其他事件

- `commandStack.changed`: 命令栈状态改变（trigger: 'execute'|'undo'|'redo'|'clear'）
- `elements.changed`: 元素变更（包含所有受影响的元素）

## 变更追踪

CommandStack 自动追踪命令执行期间变更的元素：

1. 处理器的 `execute()` 和 `revert()` 返回变更的元素
2. CommandStack 收集所有变更的元素
3. 命令执行完成后触发 `elements.changed` 事件
4. 其他模块（如 GraphicsFactory）监听此事件更新视图

## 原子操作

在 `preExecute`、`postExecute` 中执行的子命令会与主命令组合成原子操作：

```javascript
class CreateShapeWithLabelHandler {
  constructor(modeling) {
    this._modeling = modeling;
  }

  execute(context) {
    const shape = context.shape;
    canvas.addShape(shape);
    return [shape];
  }

  postExecute(context) {
    // 这个命令会与主命令一起撤销/重做
    this._modeling.createLabel(context.shape);
  }
}
```

一次撤销会撤销整个原子操作（主命令 + 所有子命令）。

## 使用建议

1. **始终通过 CommandStack 修改模型**: 不要直接修改元素属性
2. **实现完整的撤销**: 确保处理器的 `revert()` 完全撤销 `execute()`
3. **返回变更元素**: 处理器必须返回所有受影响的元素
4. **使用 pre/postExecute 执行子命令**: 不要在 `execute/revert` 中执行其他命令
5. **监听 changed 事件**: 更新 UI 状态（如启用/禁用撤销按钮）

## 典型用法

### 基本命令执行

```javascript
const commandStack = diagram.get("commandStack");

// 执行命令
commandStack.execute("shape.move", {
  shape: shape,
  delta: { x: 100, y: 50 },
});

// 撤销
commandStack.undo();

// 重做
commandStack.redo();
```

### 监听命令栈变化

```javascript
eventBus.on("commandStack.changed", function (event) {
  const trigger = event.trigger; // 'execute', 'undo', 'redo', 'clear'

  // 更新 UI
  undoButton.disabled = !commandStack.canUndo();
  redoButton.disabled = !commandStack.canRedo();
});
```

### 监听元素变更

```javascript
eventBus.on("elements.changed", function (event) {
  const elements = event.elements;

  // 更新受影响元素的图形
  elements.forEach((element) => {
    updateElementGraphics(element);
  });
});
```

### 条件执行

```javascript
// 执行前检查
if (commandStack.canExecute("shape.delete", { shape })) {
  commandStack.execute("shape.delete", { shape });
} else {
  alert("无法删除该图形");
}
```

## 相关模块

- `CommandHandler`: 定义命令的执行和撤销逻辑
- `CommandInterceptor`: 扩展命令执行流程
- `EventBus`: CommandStack 触发各种生命周期事件
