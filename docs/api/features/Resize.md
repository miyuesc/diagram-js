# Resize

调整大小功能，提供图表元素的尺寸调整交互。

## 模块说明

`Resize` 提供了图形元素的调整大小功能，通过拖拽元素边缘的控制点来改变元素尺寸。

### 核心特性

- **调整手柄**: 在可调整大小的元素周围显示8个调整手柄
- **实时预览**: 调整过程中显示尺寸预览
- **约束调整**: 支持最小/最大尺寸约束
- **保持比例**: 支持按住 Shift 保持宽高比
- **规则验证**: 通过 Rules 验证调整是否允许

## 模块依赖

```javascript
Resize.$inject = ["eventBus", "rules", "modeling", "dragging"];
```

## 主要功能

### 调整手柄

为选中的可调整大小元素显示8个方向的控制点：

- `nw` - 西北（左上）
- `n` - 北（上）
- `ne` - 东北（右上）
- `e` - 东（右）
- `se` - 东南（右下）
- `s` - 南（下）
- `sw` - 西南（左下）
- `w` - 西（左）

### 调整方向

不同方向的拖拽会产生不同的调整效果：

- **角手柄**: 同时调整宽度和高度
- **边手柄**: 只调整对应方向的尺寸

### 最小尺寸

支持通过 `shape.minBounds` 设置最小尺寸约束。

## 事件

### resize.start / resize.move / resize.end

调整大小的生命周期事件

### shape.resize

调整大小规则验证事件

## 使用场景

### 基本调整大小

```javascript
// Resize 模块自动处理：
// 1. 用户选中可调整大小的元素
// 2. 显示调整手柄
// 3. 拖动手柄调整尺寸
```

### 设置最小尺寸

```javascript
element.minBounds = { width: 50, height: 40 };
```

### 验证调整

```javascript
eventBus.on("shape.resize", HIGH_PRIORITY, function (context) {
  const shape = context.shape;
  const newBounds = context.newBounds;

  // 验证新尺寸
  if (newBounds.width < 100 || newBounds.height < 80) {
    return false; // 阻止调整
  }
});
```

### 监听调整事件

```javascript
eventBus.on("resize.end", function (event) {
  const shape = event.shape;
  console.log("调整完成:", shape.width, shape.height);
});
```

## 配置选项

```javascript
// 在元素上标记是否可调整大小
shape.resizable = true; // 或 false
```

## 相关模块

- `ResizeHandles`: 绘制调整手柄
- `Modeling`: 执行实际的调整操作
- `Rules`: 验证调整规则
- `Snapping`: 调整时的吸附功能
