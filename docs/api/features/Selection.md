# Selection

选择服务，提供图表元素的选择管理功能。

## 模块说明

`Selection` 是 diagram-js 的核心服务之一，用于管理当前选中的元素。它提供了选择、取消选择、查询选中状态的 API，并在选择状态改变时触发事件。

### 核心特性

- **单选和多选**: 支持选择单个或多个元素
- **添加选择**: 支持在现有选择基础上添加元素
- **选择事件**: 选择变化时触发 `selection.changed` 事件
- **自动清理**: 元素删除时自动从选择中移除
- **根元素过滤**: 只能选择当前激活根元素下的元素

## 模块依赖

```javascript
Selection.$inject = ["eventBus", "canvas"];
```

- `eventBus` `{EventBus}`: 事件总线
- `canvas` `{Canvas}`: 画布服务

## 公共方法

### select()

**作用**: 选择一个或多个元素。

**参数**:

- `elements` `{Element | Element[] | null}`: 要选择的元素
- `add` `{boolean}` (可选): 是否添加到现有选择，默认 `false`

**说明**:

- 传入 `null` 或空数组清空选择
- `add=false`: 替换当前选择（默认）
- `add=true`: 添加到现有选择
- 自动过滤不属于当前根元素的元素

**示例**:

```javascript
const selection = diagram.get("selection");

// 选择单个元素
selection.select(shape);

// 选择多个元素
selection.select([shape1, shape2, shape3]);

// 添加到现有选择
selection.select(shape4, true);

// 清空选择
selection.select(null);
```

---

### deselect()

**作用**: 取消选择指定元素。

**参数**:

- `element` `{Element}`: 要取消选择的元素

**示例**:

```javascript
selection.deselect(shape);
```

---

### get()

**作用**: 获取当前选中的所有元素。

**返回值**: `{Element[]}` - 选中的元素数组

**示例**:

```javascript
const selected = selection.get();
console.log("当前选中", selected.length, "个元素");
```

---

### isSelected()

**作用**: 检查元素是否被选中。

**参数**:

- `element` `{Element}`: 要检查的元素

**返回值**: `{boolean}` - 是否被选中

**示例**:

```javascript
if (selection.isSelected(shape)) {
  console.log("元素已被选中");
}
```

## 事件

### selection.changed

**触发时机**: 选择状态改变时

**参数**:

- `oldSelection` `{Element[]}`: 之前的选择
- `newSelection` `{Element[]}`: 新的选择

**示例**:

```javascript
eventBus.on("selection.changed", function (event) {
  console.log("选择变化");
  console.log("之前选中:", event.oldSelection);
  console.log("现在选中:", event.newSelection);

  // 更新UI
  updateSelectionUI(event.newSelection);
});
```

## 自动行为

### 元素删除时自动取消选择

```javascript
// 监听元素删除事件
eventBus.on(["shape.remove", "connection.remove"], function (e) {
  selection.deselect(e.element);
});
```

### 图表清空时清除选择

```javascript
// 监听图表清空和根元素切换
eventBus.on(["diagram.clear", "root.set"], function (e) {
  selection.select(null);
});
```

## 使用场景

### 点击选择元素

```javascript
eventBus.on("element.click", function (event) {
  const element = event.element;

  if (event.originalEvent.ctrlKey || event.originalEvent.metaKey) {
    // Ctrl/Cmd + 点击：切换选择状态
    if (selection.isSelected(element)) {
      selection.deselect(element);
    } else {
      selection.select(element, true);
    }
  } else if (event.originalEvent.shiftKey) {
    // Shift + 点击：添加到选择
    selection.select(element, true);
  } else {
    // 普通点击：单选
    selection.select(element);
  }
});
```

### 框选元素

```javascript
// 套索工具选择多个元素
eventBus.on("lasso.end", function (event) {
  const elements = event.elements;
  selection.select(elements);
});
```

### 全选

```javascript
function selectAll() {
  const allElements = elementRegistry.filter(function (element) {
    return element.type !== "root";
  });

  selection.select(allElements);
}
```

### 基于选择的操作

```javascript
function deleteSelected() {
  const selected = selection.get();

  if (selected.length > 0) {
    modeling.removeElements(selected);
    selection.select(null);
  }
}

function alignSelected(alignment) {
  const selected = selection.get();

  if (selected.length > 1) {
    modeling.alignElements(selected, alignment);
  }
}
```

## 使用建议

1. **清空选择**: 使用 `select(null)` 而不是 `select([])`
2. **检查选择**: 操作前检查 `selection.get().length`
3. **监听变化**: 通过 `selection.changed` 事件更新UI
4. **多选操作**: 使用 `add=true` 参数添加选择

## 典型工作流

```javascript
// 1. 用户点击元素
eventBus.on("element.click", (e) => {
  selection.select(e.element);
});

// 2. 选择变化时更新UI
eventBus.on("selection.changed", (e) => {
  updateToolbar(e.newSelection);
  updatePropertiesPanel(e.newSelection);
});

// 3. 基于选择执行操作
deleteButton.addEventListener("click", () => {
  const selected = selection.get();
  modeling.removeElements(selected);
});
```

## 相关模块

- `SelectionBehavior`: 处理选择相关的交互行为
- `SelectionVisuals`: 为选中元素添加视觉反馈
- `ContextPad`: 为选中元素显示操作按钮
