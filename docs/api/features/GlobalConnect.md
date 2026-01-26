# GlobalConnect

全局连接工具，提供全局连接模式。

## 模块说明

`GlobalConnect` 启用全局连接模式，点击任意元素开始创建连接。

## 模块依赖

```javascript
GlobalConnect.$inject = ["dragging", "connect", "toolManager"];
```

## 主要API

### toggle()

切换全局连接模式。

### start(event)

启动全局连接。

## 使用示例

```javascript
const globalConnect = diagram.get("globalConnect");

// 激活全局连接模式
globalConnect.toggle();

// 用户点击元素开始连接
```

## 相关模块

- `Connect`: 连接功能
- `ToolManager`: 工具管理
- `Palette`: 提供全局连接工具按钮
