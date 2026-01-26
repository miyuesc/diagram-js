# ToolManager

工具管理器，管理全局工具的激活状态。

## 模块说明

`ToolManager` 管理互斥工具（如手形工具、套索工具）的激活和切换。

## 模块依赖

```javascript
ToolManager.$inject = ["eventBus", "dragging"];
```

## 主要API

### setActive(name)

激活指定工具。

### isActive(name)

检查工具是否激活。

### registerTool(name, events)

注册工具。

## 使用示例

```javascript
const toolManager = diagram.get("toolManager");

// 注册工具
toolManager.registerTool("hand", {
  tool: "hand.activated",
  dragging: "hand",
});

// 激活工具
toolManager.setActive("hand");

// 检查状态
if (toolManager.isActive("hand")) {
  console.log("手形工具已激活");
}
```

## 相关模块

- `HandTool`: 使用 ToolManager 管理状态
- `LassoTool`: 使用 ToolManager 管理状态
- `GlobalConnect`: 使用 ToolManager 管理状态
