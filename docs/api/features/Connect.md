# Connect

连接功能，提供通过拖拽创建连接线的交互。

## 模块说明

`Connect` 提供了通过拖拽在两个元素之间创建连接线的功能，支持从元素拖拽到另一个元素建立连接。

### 核心特性

- **拖拽连接**: 从源元素拖拽到目标元素创建连接
- **连接预览**: 拖拽过程中显示连接线预览
- **规则验证**: 验证连接是否允许
- **自动布局**: 自动计算连接线路径
- **悬停反馈**: 目标元素高亮显示

## 模块依赖

```javascript
Connect.$inject = ["dragging", "modeling", "rules"];
```

## 主要功能

### 启动连接

可以通过以下方式启动连接：

1. 从 ContextPad 的连接按钮拖拽
2. 从 Palette 工具拖拽
3. 程序化调用 `connect.start()`

### 连接过程

1. **drag.start**: 开始拖拽，显示连接预览
2. **drag.move**: 移动时更新预览线和目标高亮
3. **drag.end**: 在有效目标上松开鼠标，创建连接
4. **drag.cancel**: 取消连接

### 连接验证

通过 `rules.allowed('connection.create')` 验证是否可以创建连接。

## 事件

### connect.start / connect.move / connect.end

连接创建的生命周期事件

### connect.hover / connect.out

鼠标悬停在潜在目标上的事件

### connection.create

连接创建规则验证事件

## 使用场景

### 程序化启动连接

```javascript
const connect = diagram.get("connect");

// 从元素开始连接
connect.start(null, source, { x: 100, y: 100 });
```

### 验证连接规则

```javascript
eventBus.on("connection.create", HIGH_PRIORITY, function (context) {
  const source = context.source;
  const target = context.target;

  // 验证是否可以连接
  if (source.type === "StartEvent" && target.type === "StartEvent") {
    return false; // 不允许开始事件之间的连接
  }
});
```

### 自定义连接行为

```javascript
eventBus.on("connect.end", function (event) {
  const source = event.source;
  const target = event.target;

  // 连接完成后的处理
  console.log("已连接:", source.id, "->", target.id);
});
```

### 自定义连接预览

```javascript
eventBus.on("connect.move", function (event) {
  const context = event.context;

  // 自定义预览样式
  if (context.target) {
    // 目标有效
    context.visual.style.stroke = "green";
  } else {
    // 目标无效
    context.visual.style.stroke = "red";
  }
});
```

## 相关模块

- `ConnectionPreview`: 显示连接预览线
- `Modeling`: 创建实际的连接线
- `Rules`: 验证连接规则
- `ContextPad`: 提供连接工具按钮
- `GlobalConnect`: 全局连接工具
