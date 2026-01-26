# Ordering

层级排序，管理元素的视觉层级顺序。

## 模块说明

`Ordering` 控制元素的渲染顺序（z-index），决定哪些元素显示在上层。

## 模块依赖

```javascript
Ordering.$inject = ["eventBus", "canvas"];
```

## 默认排序

- 连接线通常在图形下方
- 选中的元素在最上层
- 父元素在子元素下方

## 自定义排序

通过监听 `render.shape` 和 `render.connection` 事件自定义排序逻辑。

## 使用示例

```javascript
eventBus.on("render.shape", function (event) {
  const element = event.element;

  // 特殊元素总是在最上层
  if (element.type === "special") {
    event.order = 10000;
  }
});
```

## 相关模块

- `GraphicsFactory`: 元素渲染
- `Canvas`: 画布层级管理
