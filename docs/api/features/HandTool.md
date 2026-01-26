# HandTool

手形工具，提供拖拽画布平移功能。

## 模块说明

`HandTool` 允许用户通过拖拽来平移整个画布视图。

## 模块依赖

```javascript
HandTool.$inject = ["canvas", "dragging", "eventBus", "toolManager"];
```

## 主要API

### activateHand(event, autoActivate)

激活手形工具。

### toggle()

切换手形工具状态。

## 使用方式

- **空格键 + 拖拽**: 临时激活手形工具
- **点击工具按钮**: 持续激活直到点击其他工具
- **中键拖拽**: 直接平移画布

## 使用示例

```javascript
const handTool = diagram.get("handTool");

// 激活手形工具
handTool.activateHand();

// 切换
handTool.toggle();
```

## 相关模块

- `MoveCanvas`: 底层画布移动功能
- `ZoomScroll`: 缩放和滚动
- `Palette`: 提供手形工具按钮
