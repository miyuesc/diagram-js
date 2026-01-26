# Keyboard

键盘支持，提供键盘快捷键功能。

## 模块说明

`Keyboard` 管理全局键盘事件，支持注册和执行键盘快捷键。

## 模块依赖

```javascript
Keyboard.$inject = ["eventBus", "config.keyboard"];
```

## 主要API

### bind(keys, fn, scope)

绑定键盘快捷键。

**示例**:

```javascript
const keyboard = diagram.get("keyboard");

// 绑定快捷键
keyboard.bind(["ctrl", "s"], function () {
  save();
  return false; // 阻止默认行为
});

// 删除快捷键
keyboard.bind(["delete", "del"], function () {
  modeling.removeElements(selection.get());
});
```

## 配置选项

```javascript
new Diagram({
  keyboard: {
    bindTo: document, // 绑定到的元素
  },
});
```

## 常用快捷键

- `Ctrl+C`: 复制
- `Ctrl+V`: 粘贴
- `Ctrl+Z`: 撤销
- `Ctrl+Y`: 重做
- `Delete`: 删除
- `Ctrl+A`: 全选

## 相关模块

- `KeyboardMove`: 键盘移动元素
- `EditorActions`: 编辑器操作
