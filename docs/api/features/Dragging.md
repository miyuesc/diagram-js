# Dragging

拖拽框架，为所有拖拽交互提供底层支持。

## 模块说明

`Dragging` 是 diagram-js 的拖拽框架，为 Move、Resize、Connect、Create 等功能提供统一的拖拽基础设施。

### 核心特性

- **统一拖拽API**: 统一的拖拽初始化和管理
- **事件生命周期**: 标准的 start/move/end/cancel 事件
- **光标管理**: 自动设置拖拽光标
- **悬停检测**: 检测鼠标悬停在哪个元素上
- **自动激活**: 支持延迟激活拖拽（区分点击和拖拽）

## 模块依赖

```javascript
Dragging.$inject = ["eventBus", "canvas", "selection"];
```

## 主要API

### init()

**作用**: 初始化拖拽操作。

**参数**:

- `event` `{Event}`: 原始鼠标/触摸事件
- `relativeTo` `{Point | Element}`: 参考点或元素
- `prefix` `{string}`: 事件前缀（如 'shape.move'）
- `options` `{Object}`: 拖拽选项

**选项**:

- `cursor`: 光标样式
- `autoActivate`: 是否自动激活
- `data`: 传递给拖拽上下文的数据

**示例**:

```javascript
const dragging = diagram.get("dragging");

dragging.init(event, element, "shape.move", {
  cursor: "move",
  autoActivate: true,
  data: { shape: element },
});
```

## 拖拽生命周期

1. **{prefix}.init**: 拖拽初始化
2. **{prefix}.start**: 拖拽开始
3. **{prefix}.move**: 拖拽移动过程
4. **{prefix}.hover**: 悬停在元素上
5. **{prefix}.out**: 离开元素
6. **{prefix}.end**: 拖拽结束
7. **{prefix}.cancel**: 拖拽取消
8. **{prefix}.cleanup**: 清理

## 拖拽上下文

每个拖拽操作都有一个上下文对象，包含：

```javascript
{
  prefix: 'shape.move',
  data: { ... },        // 自定义数据
  delta: { x, y },      // 当前偏移量
  hover: element,       // 当前悬停元素
  ...
}
```

## 使用场景

### 实现自定义拖拽

```javascript
// 初始化拖拽
eventBus.on("element.mousedown", function (event) {
  dragging.init(event.originalEvent, element, "custom.drag", {
    cursor: "grab",
    data: { element: element },
  });
});

// 处理拖拽移动
eventBus.on("custom.drag.move", function (event) {
  const ctx = event.context;
  console.log("拖拽中:", ctx.delta);
});

// 处理拖拽结束
eventBus.on("custom.drag.end", function (event) {
  const ctx = event.context;
  console.log("拖拽结束");
});
```

##相关模块

- `Move`: 使用 Dragging 实现移动
- `Resize`: 使用 Dragging 实现调整大小
- `Connect`: 使用 Dragging 实现连接
- `Create`: 使用 Dragging 实现创建
