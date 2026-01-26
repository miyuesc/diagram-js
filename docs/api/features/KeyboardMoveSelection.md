# KeyboardMoveSelection

键盘移动选择，提供通过键盘方向键移动选中元素的功能。

## 模块说明

`KeyboardMoveSelection` 允许用户使用键盘方向键来移动选中的元素。

## 模块依赖

```javascript
KeyboardMoveSelection.$inject = ["keyboard", "modeling", "selection"];
```

## 快捷键

- `↑`: 向上移动
- `↓`: 向下移动
- `←`: 向左移动
- `→`: 向右移动
- `Shift + 方向键`: 快速移动（10像素）

## 配置选项

```javascript
new Diagram({
  keyboardMoveSelection: {
    moveSpeed: 1, // 普通移动速度（像素）
    moveSpeedAccelerated: 10, // 加速移动速度
  },
});
```

## 使用示例

```javascript
// 自动绑定快捷键，用户可直接使用
// 1. 选中元素
// 2. 按方向键移动
// 3. 按住Shift加速移动
```

## 相关模块

- `Keyboard`: 键盘事件管理
- `Modeling`: 执行移动操作
- `Selection`: 选择管理
