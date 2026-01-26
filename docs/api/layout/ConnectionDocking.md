# ConnectionDocking

连接停靠，计算连接线在元素边缘的停靠点。

## 模块说明

`ConnectionDocking` 计算连接线与元素边缘的交点，确保连接线正确连接到元素上。

## 模块依赖

```javascript
ConnectionDocking.$inject = [];
```

## 主要API

### getDockingPoint(connection, shape, dockStart)

计算停靠点。

**参数**:

- `connection` `{Connection}`: 连接线
- `shape` `{Shape}`: 图形
- `dockStart` `{boolean}`: 是否为起点

**返回值**: `{Point}` - 停靠点坐标

## 实现原理

1. 获取连接线的路径点
2. 计算从图形中心到路径点的射线
3. 计算射线与图形边界的交点
4. 返回交点作为停靠点

## 使用示例

```javascript
const docking = diagram.get("connectionDocking");

const dockingPoint = docking.getDockingPoint(
  connection,
  connection.source,
  true, // 起点
);
```

## 相关模块

- `CroppingConnectionDocking`: 裁剪式停靠
- `ManhattanLayout`: 使用停靠计算
