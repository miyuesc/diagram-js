# Palette

工具面板，提供创建元素和工具的全局面板。

## 模块说明

`Palette` 在画布侧边显示一个工具面板，提供创建各种元素类型和激活工具的入口。

### 核心特性

- **工具分组**: 工具可按类别分组
- **可扩展**: 支持自定义工具
- **拖拽创建**: 拖拽工具到画布创建元素
- **工具激活**: 点击激活全局工具

## 模块依赖

```javascript
Palette.$inject = ["eventBus", "canvas", "config.palette"];
```

## 主要API

### registerProvider()

**作用**: 注册工具面板提供器。

**参数**:

- `priority` `{number}`: 优先级
- `provider` `{Object}`: 提供器对象

**提供器方法**:

- `getPaletteEntries()`: 返回工具配置

**示例**:

```javascript
const palette = diagram.get("palette");
const create = diagram.get("create");

palette.registerProvider({
  getPaletteEntries: function () {
    return {
      "create.task": {
        group: "model",
        className: "bpmn-icon-task",
        title: "创建任务",
        action: {
          dragstart: function (event) {
            create.start(event, {
              type: "bpmn:Task",
              width: 100,
              height: 80,
            });
          },
          click: function (event) {
            create.start(event, {
              type: "bpmn:Task",
              width: 100,
              height: 80,
            });
          },
        },
      },
      "hand-tool": {
        group: "tools",
        className: "bpmn-icon-hand-tool",
        title: "手形工具",
        action: {
          click: function () {
            handTool.activateHand();
          },
        },
      },
      "lasso-tool": {
        group: "tools",
        className: "bpmn-icon-lasso-tool",
        title: "套索工具",
        action: {
          click: function () {
            lassoTool.activateSelection();
          },
        },
      },
    };
  },
});
```

## 工具配置

每个工具配置对象包含：

```javascript
{
  group: 'model',                   // 分组
  className: 'icon-task',           // CSS类名
  title: '创建任务',                // 提示文本
  imageUrl: 'path/to/icon.svg',     // 图标URL（可选）
  action: {
    click: function(event) {},       // 点击处理
    dragstart: function(event) {}    // 拖拽开始处理
  }
}
```

## 工具分组

常用分组：

- `model`: 模型元素（创建任务、事件等）
- `tools`: 工具（手形工具、套索工具等）
- `edit`: 编辑工具

## 配置选项

```javascript
new Diagram({
  palette: {
    open: true, // 默认是否展开面板
  },
});
```

## 使用场景

### 完整的自定义 Palette

```javascript
function CustomPaletteProvider(
  palette,
  create,
  elementFactory,
  handTool,
  lassoTool,
) {
  this._palette = palette;
  this._create = create;
  this._elementFactory = elementFactory;
  this._handTool = handTool;
  this._lassoTool = lassoTool;

  palette.registerProvider(this);
}

CustomPaletteProvider.prototype.getPaletteEntries = function () {
  const create = this._create;
  const elementFactory = this._elementFactory;

  function createAction(type, group, title) {
    return {
      group: group,
      title: title,
      action: {
        dragstart: createListener(type),
        click: createListener(type),
      },
    };
  }

  function createListener(type) {
    return function (event) {
      const shape = elementFactory.createShape({ type });
      create.start(event, shape);
    };
  }

  return {
    "hand-tool": {
      group: "tools",
      title: "手形工具",
      action: {
        click: () => this._handTool.activateHand(),
      },
    },
    "lasso-tool": {
      group: "tools",
      title: "套索工具",
      action: {
        click: () => this._lassoTool.activateSelection(),
      },
    },
    "create.start-event": createAction("bpmn:StartEvent", "event", "开始事件"),
    "create.task": createAction("bpmn:Task", "activity", "任务"),
    "create.gateway": createAction("bpmn:Gateway", "gateway", "网关"),
  };
};
```

## 相关模块

- `Create`: 创建元素
- `HandTool`: 手形工具
- `LassoTool`: 套索工具
- `ContextPad`: 元素上下文菜单
