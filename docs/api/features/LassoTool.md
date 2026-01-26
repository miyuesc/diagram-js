# LassoTool

套索工具，提供框选多个元素的功能。

## 模块说明

`LassoTool` 允许用户通过绘制套索框来选择多个元素。

## 模块依赖

```javascript
LassoTool.$inject = [
  "eventBus",
  "canvas",
  "dragging",
  "elementRegistry",
  "selection",
  "toolManager",
];
```

## 主要API

### activateSelection(event, autoActivate)

激活套索选择工具。

### toggle()

切换套索工具状态。

## 使用方式

- **点击工具按钮**: 激活套索工具
- **拖拽**: 绘制套索框选择元素
- **Shift + 拖拽**: 添加到现有选择

## 使用示例

```javascript
const lassoTool = diagram.get("lassoTool");

// 激活套索工具
lassoTool.activateSelection();

// 监听套索结束
eventBus.on("lasso.end", function (event) {
  console.log("选中了", event.elements.length, "个元素");
});
```

## 相关模块

- `Selection`: 管理选中的元素
- `Palette`: 提供套索工具按钮
- `SpaceTool`: 空间调整工具
