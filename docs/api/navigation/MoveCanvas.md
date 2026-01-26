# MoveCanvas

画布移动，提供画布平移和拖拽功能。

## 模块说明

`MoveCanvas` 提供画布的拖拽平移功能，是 HandTool 和空格键平移的底层实现。

## 模块依赖

```javascript
MoveCanvas.$inject = ["eventBus", "canvas"];
```

## 主要功能

- 支持鼠标拖拽平移画布
- 支持触摸拖拽
- 与 HandTool 集成
- 支持空格键临时激活

## 事件

### canvas.move

画布移动事件。

## 使用示例

```javascript
// 通过 HandTool 使用
const handTool = diagram.get("handTool");
handTool.activateHand();

// 或通过空格键
// 按住空格键 + 拖拽画布
```

## 配置选项

```javascript
new Diagram({
  moveCanvas: {
    enabled: true,
  },
});
```

## 相关模块

- `HandTool`: 使用 MoveCanvas 实现手形工具
- `Canvas`: 执行实际的视图平移
- `ZoomScroll`: 配合缩放功能
