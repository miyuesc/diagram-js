# Create

创建功能，提供从工具面板拖拽创建新元素的交互。

## 模块说明

`Create` 提供了从 Palette 或其他来源拖拽创建新元素的功能。

### 核心特性

- **拖拽创建**: 从工具面板拖拽到画布创建元素
- **创建预览**: 拖拽过程中显示元素预览
- **规则验证**: 验证是否可以在目标位置创建
- **自动连接**: 支持创建时自动建立连接

## 模块依赖

```javascript
Create.$inject = ["dragging", "rules", "modeling"];
```

## 主要API

###start()

**作用**: 启动创建拖拽。

**参数**:

- `event` `{Event}`: 鼠标/触摸事件
- `shape` `{Shape | Object}`: 要创建的图形
- `options` `{Object}` (可选): 创建选项

**示例**:

```javascript
const create = diagram.get("create");

// 从 Palette 启动创建
paletteEntry.addEventListener("mousedown", function (e) {
  create.start(e, {
    type: "custom:Task",
    width: 100,
    height: 80,
  });
});
```

## 事件

### create.start / create.move / create.end

创建的生命周期事件

### shape.create

创建规则验证事件

## 使用场景

### 工具面板创建

```javascript
// Palette 中的工具
const tools = [
  {
    label: "任务",
    action: function (event) {
      create.start(event, {
        type: "bpmn:Task",
        width: 100,
        height: 80,
      });
    },
  },
];
```

### 拖拽创建并连接

```javascript
create.start(event, shape, {
  hints: {
    autoSelect: false,
    source: sourceElement, // 自动连接到source
  },
});
```

## 相关模块

- `Palette`: 提供创建工具
- `Modeling`: 执行实际创建
- `Rules`: 验证创建规则
- `CreatePreview`: 显示创建预览
