# ManhattanLayout

Manhattan 布局，提供直角连接线布局。

## 模块说明

`ManhattanLayout` 实现 Manhattan（曼哈顿）风格的连接线布局，即只使用水平和垂直线段。

## 模块依赖

```javascript
ManhattanLayout.$inject = [];
```

## 布局特点

- 只使用水平和垂直线段
- 自动避让障碍物（在某些实现中）
- 适合流程图、组织结构图等

## 算法

1. 从源元素的最佳出口点出发
2. 通过一系列水平/垂直线段
3. 到达目标元素的最佳入口点
4. 尽量减少弯折次数

## 使用示例

```javascript
// ManhattanLayout 通常作为默认布局器
// 在 modeling.layoutConnection() 时自动使用

const modeling = diagram.get("modeling");
modeling.layoutConnection(connection);
```

## 相关模块

- `BaseLayouter`: 布局器基类
- `ConnectionDocking`: 计算连接点
- `Modeling.layoutConnection()`: 使用布局器
