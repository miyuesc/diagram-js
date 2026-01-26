# 介绍

## 什么是 diagram-js？

diagram-js 是一个用于在 Web 上显示和修改图表的工具箱。它提供了一套完整的图表渲染、交互和编辑功能，是 [bpmn-js](https://github.com/bpmn-io/bpmn-js)、[dmn-js](https://github.com/bpmn-io/dmn-js) 等流程建模工具的核心引擎。

## 主要特性

### 🎨 灵活的渲染引擎

diagram-js 使用 SVG 进行图形渲染，提供了：

- 自定义形状和连接线
- 多层级渲染管理
- 高质量的视觉效果

### 📦 模块化架构

采用依赖注入（DI）模式，核心功能包括：

- **Model**: 定义图表元素的数据结构
- **Core**: 提供画布、元素注册表、事件总线等核心服务
- **Command**: 实现命令模式，支持撤销/重做
- **Features**: 40+ 个可选功能模块

### 🔧 丰富的功能特性

内置功能包括：

- 拖拽移动（Move）
- 尺寸调整（Resize）
- 元素对齐（Align）
- 网格吸附（Grid Snapping）
- 连接线编辑（Bendpoints）
- 复制粘贴（Copy/Paste）
- 撤销重做（Undo/Redo）
- 键盘快捷键（Keyboard）
- 上下文菜单（Context Pad）
- 悬浮提示（Tooltips）
- ... 以及更多

### 🚀 高性能

- 优化的事件系统
- 高效的 DOM 操作
- 支持大规模图表

## 核心概念

### 元素模型（Model）

diagram-js 中的图表由以下类型的元素组成：

- **Shape**: 矩形、圆形等图形元素
- **Connection**: 连接两个元素的连线
- **Label**: 文本标签
- **Root**: 根元素，所有其他元素的容器

### 依赖注入（DI）

diagram-js 使用 [didi](https://github.com/nikku/didi) 作为依赖注入容器。每个模块可以声明依赖，并通过 `$inject` 属性注入：

```javascript
function MyService(eventBus, canvas) {
  // 使用 eventBus 和 canvas 服务
}

MyService.$inject = ["eventBus", "canvas"];
```

### 事件驱动

所有交互和状态变更都通过 `EventBus` 传递事件：

```javascript
// 监听事件
eventBus.on("element.click", function (event) {
  console.log("点击了元素:", event.element);
});

// 触发事件
eventBus.fire("custom.event", { data: "hello" });
```

### 命令模式

所有修改操作都通过 `CommandStack` 执行，自动支持撤销/重做：

```javascript
// 执行命令
commandStack.execute("element.move", {
  element: shape,
  delta: { x: 100, y: 50 },
});

// 撤销
commandStack.undo();

// 重做
commandStack.redo();
```

## 使用场景

diagram-js 适用于以下场景：

- **流程建模工具**: BPMN、DMN、CMMN 等标准流程图
- **图表编辑器**: 流程图、组织架构图、拓扑图等
- **可视化工具**: 数据流图、状态图、UML 图等
- **低代码平台**: 可视化配置和编排工具

## 下一步

- 查看 [Model 模块](/api/model/) 了解数据模型
- 查看 [Core 模块](/api/core/Canvas) 了解核心服务
- 探索 [Features 模块](/api/features/Selection) 了解功能特性
