# InteractionEvents

交互事件，提供统一的元素交互事件。

## 模块说明

`InteractionEvents` 标准化鼠标和触摸事件，提供统一的交互事件接口。

## 主要事件

### element.hover

鼠标悬停在元素上。

### element.out

鼠标离开元素。

### element.click

点击元素。

### element.dblclick

双击元素。

### element.mousedown

鼠标在元素上按下。

### element.mouseup

鼠标在元素上释放。

### element.contextmenu

右键菜单。

## 事件对象

```javascript
{
  element: element,      // 目标元素
  gfx: gfx,             // SVG 图形
  originalEvent: event,  // 原始DOM事件
  x: 100,               // 画布坐标x
  y: 200                // 画布坐标y
}
```

## 使用示例

```javascript
eventBus.on("element.hover", function (event) {
  console.log("悬停在:", event.element.id);
  // 显示悬停效果
});

eventBus.on("element.click", function (event) {
  console.log("点击:", event.element.id);
  // 处理点击
});

eventBus.on("element.contextmenu", function (event) {
  event.originalEvent.preventDefault();
  // 显示自定义右键菜单
});
```

## 相关模块

- `Mouse`: 鼠标事件处理
- `Selection`: 监听点击事件进行选择
