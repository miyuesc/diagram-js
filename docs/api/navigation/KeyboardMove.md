# KeyboardMove

键盘移动，通过箭头键平移画布。

## 模块说明

`KeyboardMove` 提供使用键盘箭头键平移画布视图的功能。

## 模块依赖

```javascript
KeyboardMove.$inject = ["keyboard", "canvas"];
```

## 快捷键

- `↑`: 向上平移
- `↓`: 向下平移
- `←`: 向左平移
- `→`: 向右平移
- `Shift + 箭头`: 快速平移

## 配置选项

```javascript
new Diagram({
  keyboardMove: {
    moveSpeed: 50, // 普通移动距离（像素）
    moveSpeedAccelerated: 200, // 加速移动距离
  },
});
```

## 使用示例

```javascript
// 自动绑定快捷键
// 用户直接使用箭头键平移画布
```

## 相关模块

- `Keyboard`: 键盘事件管理
- `Canvas`: 执行平移
- `KeyboardMoveSelection`: 键盘移动元素
