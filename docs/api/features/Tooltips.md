# Tooltips

提示框，提供元素悬停提示功能。

## 模块说明

`Tooltips` 在鼠标悬停在元素上时显示提示信息。

## 模块依赖

```javascript
Tooltips.$inject = ["eventBus", "canvas"];
```

## 主要API

### add(target, tooltip)

添加提示框。

**参数**:

- `target` - 目标元素或位置
- `tooltip` - 提示框配置

**配置**:

```javascript
{
  html: '<div>提示内容</div>',
  position: { x: 100, y: 100 },
  timeout: 1000  // 自动隐藏时间
}
```

### remove(tooltip)

删除提示框。

## 使用示例

```javascript
const tooltips = diagram.get("tooltips");

// 显示元素提示
eventBus.on("element.hover", function (event) {
  const tooltip = tooltips.add(event.element, {
    html: "<div>" + event.element.businessObject.name + "</div>",
    position: { x: event.x, y: event.y },
  });

  // 鼠标移开时删除
  eventBus.once("element.out", function () {
    tooltips.remove(tooltip);
  });
});
```

## 相关模块

- `Overlays`: 固定覆盖层
- `InteractionEvents`: 悬停事件
