# HoverFix

悬停修复，修复某些浏览器的悬停事件问题。

## 模块说明

`HoverFix` 解决某些浏览器（特别是旧版本）中悬停事件不正确触发的问题。

## 模块依赖

```javascript
HoverFix.$inject = ["eventBus", "elementRegistry"];
```

## 主要功能

- 修复悬停事件在快速移动时丢失
- 确保 element.out 事件正确触发
- 提供一致的跨浏览器行为

## 使用

自动工作，无需手动调用。

## 相关模块

- `InteractionEvents`: 悬停事件
- `Tooltips`: 依赖准确的悬停事件
