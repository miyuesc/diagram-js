# CopyPaste

复制粘贴功能，支持图表元素的复制和粘贴操作。

## 模块说明

`CopyPaste` 提供了复制选中元素并粘贴到画布的功能，支持键盘快捷键和编程API。

## 模块依赖

```javascript
CopyPaste.$inject = ["eventBus", "clipboard", "create", "canvas", "modeling"];
```

## 主要API

### copy(elements)

复制元素到剪贴板。

### paste()

粘贴剪贴板中的元素。

## 快捷键

- `Ctrl+C / Cmd+C`: 复制
- `Ctrl+V / Cmd+V`: 粘贴
- `Ctrl+X / Cmd+X`: 剪切

## 使用示例

```javascript
const copyPaste = diagram.get("copyPaste");

// 复制选中元素
copyPaste.copy(selection.get());

// 粘贴
copyPaste.paste();
```

## 相关模块

- `Clipboard`: 剪贴板服务
- `Keyboard`: 键盘快捷键
- `Modeling`: 创建粘贴的元素
