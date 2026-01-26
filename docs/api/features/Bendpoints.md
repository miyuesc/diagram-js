# Bendpoints

折点编辑，提供连接线路径点的编辑功能。

## 模块说明

`Bendpoints` 允许用户通过拖拽编辑连接线的路径点（waypoints），添加、移动或删除折点。

### 核心特性

- **添加折点**: 点击连接线添加新折点
- **移动折点**: 拖拽现有折点调整位置
- **删除折点**: 双击或拖出折点删除
- **视觉反馈**: 悬停时显示可操作的折点

## 模块依赖

```javascript
Bendpoints.$inject = ["eventBus", "canvas", "dragging", "modeling"];
```

## 主要功能

### 折点手柄

在连接线上显示可拖拽的折点手柄：

- 现有waypoints位置显示实心圆点
- 线段中点显示虚拟折点（半透明）

### 编辑操作

- **添加**: 拖拽虚拟折点创建新折点
- **移动**: 拖拽实心折点调整位置
- **删除**: 双击折点或拖到连接线外

## 事件

### bendpoint.move.start / move / end

折点拖拽事件

### connection.updateWaypoints

更新路径点时触发

## 使用场景

### 基本折点编辑

```javascript
// Bendpoints 自动处理:
// 1. 选中连接线显示折点
// 2. 点击线段添加折点
// 3. 拖拽折点调整路径
// 4. 双击删除折点
```

### 自定义折点行为

```javascript
eventBus.on("bendpoint.move.end", function (event) {
  const context = event.context;
  const connection = context.connection;
  const waypoints = context.newWaypoints;

  // 自定义waypoints处理
  modeling.updateWaypoints(connection, waypoints);
});
```

## 相关模块

- `ConnectionSegmentMove`: 移动整个连接线段
- `Modeling`: 更新waypoints
- `LineIntersection`: 计算插入点
