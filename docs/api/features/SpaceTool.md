# SpaceTool

空间工具，提供批量调整元素间距的功能。

## 模块说明

`SpaceTool` 允许用户通过拖拽来创建或移除空间，自动调整相关元素的位置。

## 模块依赖

```javascript
SpaceTool.$inject = [
  "dragging",
  "canvas",
  "modeling",
  "rules",
  "toolManager",
  "eventBus",
];
```

## 主要API

### activate(event)

激活空间工具。

## 使用方式

1. 点击 Palette 中的空间工具按钮
2. 在画布上点击并拖拽
3. 相关元素自动移动或调整大小

## 使用示例

```javascript
const spaceTool = diagram.get("spaceTool");

// 激活空间工具
spaceTool.activate();

// 监听空间调整
eventBus.on("spaceTool.end", function (event) {
  console.log("空间调整完成");
});
```

## 相关模块

- `Modeling.createSpace()`: 底层空间创建
- `Rules`: 验证空间调整规则
