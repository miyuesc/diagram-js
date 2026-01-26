# PopupMenu

弹出菜单，提供上下文弹出菜单功能。

## 模块说明

`PopupMenu` 显示带有选项列表的弹出菜单，用于元素替换、操作选择等。

## 模块依赖

```javascript
PopupMenu.$inject = ["eventBus", "canvas"];
```

## 主要API

### open(element, id, entries, options)

打开弹出菜单。

**参数**:

- `element` - 目标元素
- `id` - 菜单ID
- `entries` - 菜单项配置
- `options` - 显示选项

## 使用示例

```javascript
const popupMenu = diagram.get("popupMenu");

popupMenu.open(element, "replace-menu", {
  "replace-task": {
    label: "替换为任务",
    action: () => replace.replaceElement(element, { type: "bpmn:Task" }),
  },
  "replace-gateway": {
    label: "替换为网关",
    action: () => replace.replaceElement(element, { type: "bpmn:Gateway" }),
  },
});
```

## 相关模块

- `ContextPad`: 可能触发弹出菜单
- `Replace`: 替换菜单常用场景
