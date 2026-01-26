# ContextPad

上下文菜单，为选中元素提供快捷操作按钮。

## 模块说明

`ContextPad` 在元素被选中时显示一组操作按钮，提供删除、连接等常用操作的快速访问。

### 核心特性

- **动态显示**: 元素选中时自动显示
- **可扩展**: 支持自定义按钮
- **智能定位**: 自动选择最佳显示位置
- **分组显示**: 按钮可分组组织

## 模块依赖

```javascript
ContextPad.$inject = ["eventBus", "canvas", "config.contextPad"];
```

## 主要API

### registerProvider()

**作用**: 注册上下文菜单提供器。

**参数**:

- `priority` `{number}`: 优先级
- `provider` `{Object}`: 提供器对象

**提供器方法**:

- `getContextPadEntries(element)`: 返回按钮配置

**示例**:

```javascript
const contextPad = diagram.get("contextPad");

contextPad.registerProvider({
  getContextPadEntries: function (element) {
    return {
      delete: {
        group: "edit",
        className: "bpmn-icon-trash",
        title: "删除",
        action: {
          click: function () {
            modeling.removeElements([element]);
          },
        },
      },
      connect: {
        group: "connect",
        className: "bpmn-icon-connection",
        title: "连接",
        action: {
          click: function (event) {
            connect.start(event, element);
          },
          dragstart: function (event) {
            connect.start(event, element);
          },
        },
      },
    };
  },
});
```

## 按钮配置

每个按钮配置对象包含：

```javascript
{
  group: 'edit',                    // 分组
  className: 'icon-delete',         // CSS类名
  title: '删除元素',                 // 提示文本
  imageUrl: 'path/to/icon.svg',     // 图标URL（可选）
  action: {
    click: function(event) {},       // 点击处理
    dragstart: function(event) {}    // 拖拽开始处理
  }
}
```

## 按钮分组

常用分组：

- `edit`: 编辑操作（删除、编辑等）
- `connect`: 连接操作
- `model`: 模型操作

## 配置选项

```javascript
new Diagram({
  contextPad: {
    scale: true, // 是否随缩放调整大小
  },
});
```

## 使用场景

### 添加自定义按钮

```javascript
function CustomContextPadProvider(contextPad, modeling) {
  this._contextPad = contextPad;
  this._modeling = modeling;

  contextPad.registerProvider(this);
}

CustomContextPadProvider.prototype.getContextPadEntries = function (element) {
  const modeling = this._modeling;

  return {
    "custom-action": {
      group: "edit",
      className: "custom-icon",
      title: "自定义操作",
      action: {
        click: function () {
          // 执行自定义操作
          console.log("自定义操作:", element.id);
        },
      },
    },
  };
};
```

## 相关模块

- `Selection`: 选中时触发ContextPad显示
- `Modeling`: 执行操作
- `Connect`: 连接工具
- `Palette`: 全局工具面板
