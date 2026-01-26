# Snapping

吸附功能，提供元素对齐吸附辅助。

## 模块说明

`Snapping` 在移动和调整大小时提供对齐吸附功能，帮助精确定位。

## 模块依赖

```javascript
Snapping.$inject = ["eventBus"];
```

## 吸附类型

- 元素边缘吸附
- 元素中心吸附
- 自定义吸附点

## 配置

```javascript
new Diagram({
  snapping: {
    enabled: true,
  },
});
```

## 使用示例

```javascript
// Snapping 自动在移动和调整大小时工作
// 接近其他元素时会显示吸附线并自动对齐
```

## 相关模块

- `GridSnapping`: 网格吸附
- `Move`: 移动时吸附
- `Resize`: 调整大小时吸附
