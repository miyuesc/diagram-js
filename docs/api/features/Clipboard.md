# Clipboard

剪贴板，提供元素的剪贴板存储功能。

## 模块说明

`Clipboard` 管理复制的元素数据，支持跨图表复制粘贴。

## 模块依赖

```javascript
Clipboard.$inject = [];
```

## 主要API

### set(elements)

保存元素到剪贴板。

### get()

获取剪贴板内容。

### clear()

清空剪贴板。

### isEmpty()

检查剪贴板是否为空。

## 使用示例

```javascript
const clipboard = diagram.get("clipboard");

// 保存到剪贴板
clipboard.set([element1, element2]);

// 获取剪贴板内容
const elements = clipboard.get();

// 清空剪贴板
clipboard.clear();
```

## 相关模块

- `CopyPaste`: 使用 Clipboard 存储复制的元素
