# Platform

平台检测工具，提供操作系统检测功能。

## 模块说明

`Platform` 提供了检测操作系统平台的工具函数。

## 模块依赖

此模块为纯工具函数模块，无外部依赖。

## 公共方法

### isMac()

**作用**: 检测当前平台是否为 macOS。

**返回值**: `{boolean}` - 是否为 Mac 平台

**示例**:

```javascript
import { isMac } from "diagram-js/lib/util/Platform";

if (isMac()) {
  console.log("使用 Cmd 键作为主修饰键");
} else {
  console.log("使用 Ctrl 键作为主修饰键");
}
```

## 使用场景

### 键盘快捷键

```javascript
import { isMac } from "diagram-js/lib/util/Platform";

function getModifierKey() {
  return isMac() ? "metaKey" : "ctrlKey";
}

eventBus.on("element.click", function (event) {
  const modifierKey = getModifierKey();

  if (event.originalEvent[modifierKey]) {
    // 处理 Cmd/Ctrl + Click
  }
});
```

## 相关模块

- `Mouse`: 使用 Platform 检测来确定主修饰键
- `Keyboard`: 键盘事件处理可能使用平台检测
