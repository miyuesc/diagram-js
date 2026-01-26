# CroppingConnectionDocking

裁剪连接停靠，通过裁剪连接线实现停靠。

## 模块说明

`CroppingConnectionDocking` 通过实际裁剪连接线与图形的重叠部分来实现停靠。

## 模块依赖

```javascript
CroppingConnectionDocking.$inject = ["elementRegistry", "graphicsFactory"];
```

## 与 ConnectionDocking 的区别

- `ConnectionDocking`: 基于几何计算交点
- `CroppingConnectionDocking`: 使用 SVG 路径裁剪，支持复杂图形

## 适用场景

- 不规则图形
- 圆形、椭圆形
- 自定义路径图形

## 相关模块

- `ConnectionDocking`: 基础停靠
- `GraphicsFactory`: 获取图形路径
