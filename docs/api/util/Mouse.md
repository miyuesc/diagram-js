# Mouse

鼠标工具，提供鼠标按键和修饰键检测功能。

## 模块说明

`Mouse` 提供了用于检测鼠标按键和修饰键状态的工具函数，支持跨平台（Mac/非Mac）的修饰键检测。

## 模块依赖

此模块依赖 `Event` 和 `Platform` 工具模块。

## 公共方法

### isPrimaryButton()

**作用**: 检测是否为鼠标主按键（左键）。

**参数**:

- `event` `{MouseEvent}`: 鼠标事件

**返回值**: `{boolean}` - 是否为主按键

**示例**:

```javascript
import { isPrimaryButton } from "diagram-js/lib/util/Mouse";

element.addEventListener("mousedown", function (event) {
  if (isPrimaryButton(event)) {
    console.log("左键点击");
  }
});
```

---

### isAuxiliaryButton()

**作用**: 检测是否为鼠标辅助按键（中键/滚轮键）。

**参数**:

- `event` `{MouseEvent}`: 鼠标事件

**返回值**: `{boolean}` - 是否为辅助按键

---

### isSecondaryButton()

**作用**: 检测是否为鼠标次要按键（右键）。

**参数**:

- `event` `{MouseEvent}`: 鼠标事件

**返回值**: `{boolean}` - 是否为次要按键

**示例**:

```javascript
import { isSecondaryButton } from "diagram-js/lib/util/Mouse";

element.addEventListener("mousedown", function (event) {
  if (isSecondaryButton(event)) {
    console.log("右键点击");
    event.preventDefault(); // 阻止默认上下文菜单
  }
});
```

---

### hasPrimaryModifier()

**作用**: 检测是否按下主修饰键（Mac: Cmd, 其他: Ctrl）并且是主按键点击。

**参数**:

- `event` `{MouseEvent}`: 鼠标事件

**返回值**: `{boolean}` - 是否按下主修饰键

**说明**:

- Mac 平台检测 `metaKey` (Cmd)
- 其他平台检测 `ctrlKey`
- 必须同时是主按键（左键）点击

**示例**:

```javascript
import { hasPrimaryModifier } from "diagram-js/lib/util/Mouse";

eventBus.on("element.click", function (event) {
  if (hasPrimaryModifier(event)) {
    // Cmd/Ctrl + 左键点击 - 多选
    toggleSelection(event.element);
  }
});
```

---

### hasSecondaryModifier()

**作用**: 检测是否按下次要修饰键（Shift）并且是主按键点击。

**参数**:

- `event` `{MouseEvent}`: 鼠标事件

**返回值**: `{boolean}` - 是否按下次要修饰键

**示例**:

```javascript
import { hasSecondaryModifier } from "diagram-js/lib/util/Mouse";

eventBus.on("element.click", function (event) {
  if (hasSecondaryModifier(event)) {
    // Shift + 左键点击 - 范围选择
    selectRange(lastSelected, event.element);
  }
});
```

---

### isMac()

**作用**: 检测是否为 Mac 平台（从 Platform 模块导出）。

**返回值**: `{boolean}` - 是否为 Mac

## 使用场景

### 元素多选

```javascript
import {
  hasPrimaryModifier,
  hasSecondaryModifier,
} from "diagram-js/lib/util/Mouse";

eventBus.on("element.click", function (event) {
  const element = event.element;

  if (hasPrimaryModifier(event)) {
    // Cmd/Ctrl + Click: 切换选择状态
    selection.toggle(element);
  } else if (hasSecondaryModifier(event)) {
    // Shift + Click: 范围选择
    selection.selectRange(element);
  } else {
    // 普通点击: 单选
    selection.select(element);
  }
});
```

### 上下文菜单

```javascript
import { isSecondaryButton } from "diagram-js/lib/util/Mouse";

eventBus.on("element.mousedown", function (event) {
  if (isSecondaryButton(event)) {
    showContextMenu(event.element, event);
    event.preventDefault();
    return false;
  }
});
```

### 中键拖动

```javascript
import { isAuxiliaryButton } from "diagram-js/lib/util/Mouse";

eventBus.on("canvas.mousedown", function (event) {
  if (isAuxiliaryButton(event)) {
    // 启用手形工具拖动画布
    startPanning(event);
  }
});
```

## 按键对照

- **button 0**: 主按键（左键）
- **button 1**: 辅助按键（中键/滚轮）
- **button 2**: 次要按键（右键）

## 修饰键对照

- **Mac**: Cmd (`metaKey`) 为主修饰键
- **其他平台**: Ctrl (`ctrlKey`) 为主修饰键
- **所有平台**: Shift (`shiftKey`) 为次要修饰键

## 相关模块

- `Event`: 获取原始事件
- `Platform`: 检测操作系统平台
- `Selection`: 使用修饰键进行多选
