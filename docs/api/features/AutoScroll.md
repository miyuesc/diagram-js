# AutoScroll

自动滚动，拖拽到画布边缘时自动滚动视图。

## 模块说明

`AutoScroll` 在拖拽元素接近画布边缘时自动滚动画布，提供流畅的拖拽体验。

## 模块依赖

```javascript
AutoScroll.$inject = ["eventBus", "canvas", "config.autoScroll"];
```

## 配置选项

```javascript
new Diagram({
  autoScroll: {
    scrollThresholdIn: 20, // 触发滚动的边缘距离（px）
    scrollThresholdOut: 30, // 停止滚动的距离
    scrollRepeatTimeout: 15, // 滚动重复间隔（ms）
  },
});
```

## 相关模块

- `Move`: 移动时触发自动滚动
- `Create`: 创建时触发自动滚动
