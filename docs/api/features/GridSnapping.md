# GridSnapping

网格吸附，提供网格对齐功能。

## 模块说明

`GridSnapping` 将元素吸附到虚拟网格，实现整齐对齐。

## 模块依赖

```javascript
GridSnapping.$inject = ["eventBus"];
```

## 配置选项

```javascript
new Diagram({
  gridSnapping: {
    active: true,
    snapTo: "grid", // 或 'visualGrid'
    gridSize: 10, // 网格大小（像素）
  },
});
```

## 使用示例

```javascript
const gridSnapping = diagram.get("gridSnapping");

// 切换网格吸附
gridSnapping.toggleSnapping();

// 设置网格大小
gridSnapping.setGridSize(20);
```

## 相关模块

- `Snapping`: 通用吸附功能
- `Move`: 移动时网格吸附
