# Move

移动功能，提供图表元素的拖拽移动交互。

## 模块说明

`Move` 是 diagram-js 的核心交互功能，它处理元素的拖拽移动操作，包括鼠标拖拽、触摸拖拽等交互方式。

### 核心特性

- **拖拽移动**: 支持鼠标和触摸拖拽
- **实时预览**: 拖拽过程中显示移动预览
- **规则验证**: 通过 Rules 服务验证移动是否允许
- **自动吸附**: 支持与 Snapping 功能配合
- **批量移动**: 支持同时移动多个选中元素

## 模块依赖

```javascript
Move.$inject = ["eventBus", "dragging", "modeling", "selection", "canvas"];
```

## 主要功能

### 拖拽启动

监听 `element.mousedown` 事件，当满足条件时启动拖拽：

- 鼠标左键按下
- 在可移动的元素上
- 未被其他工具占用

### 拖拽过程

1. **drag.start**: 开始拖拽，创建移动上下文
2. **drag.move**: 拖拽移动，更新预览位置
3. **drag.end**: 结束拖拽，执行实际移动
4. **drag.cancel**: 取消拖拽

### 移动验证

通过 `rules.allowed('elements.move')` 验证移动是否合法。

## 事件

### element.mousedown

开始拖拽的触发点

### drag.start / drag.move / drag.end

拖拽生命周期事件

### elements.move.start / elements.move.move / elements.move.end

元素移动的具体事件

## 使用场景

### 基本拖拽移动

```javascript
// Move 模块自动处理以下交互：
// 1. 用户在元素上按鼠标左键
// 2. 拖动鼠标
// 3. 松开鼠标完成移动
```

### 自定义移动行为

```javascript
// 监听移动事件
eventBus.on("elements.move.start", function (event) {
  console.log("开始移动元素");
});

eventBus.on("elements.move.end", function (event) {
  console.log("移动完成:", event.delta);
});
```

### 验证移动

```javascript
// 通过 Rules 限制移动
eventBus.on("elements.move", HIGH_PRIORITY, function (context) {
  const shapes = context.shapes;
  const target = context.target;

  // 检查是否允许移动到目标
  if (!canMoveToTarget(shapes, target)) {
    return false; // 阻止移动
  }
});
```

## 配置选项

可以通过 `config.move` 配置移动行为：

```javascript
new Diagram({
  move: {
    // 移动相关配置
  },
});
```

## 相关模块

- `Dragging`: Move 使用 Dragging 框架
- `Modeling`: 执行实际的移动操作
- `Selection`: 处理多选元素的移动
- `Rules`: 验证移动规则
- `Snapping`: 移动时的吸附功能
