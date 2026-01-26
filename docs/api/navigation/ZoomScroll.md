# ZoomScroll

缩放滚动，提供画布缩放和滚动功能。

## 模块说明

`ZoomScroll` 提供鼠标滚轮缩放、触摸板缩放和滚动功能。

## 模块依赖

```javascript
ZoomScroll.$inject = ["eventBus", "canvas", "config.zoomScroll"];
```

## 主要功能

- 鼠标滚轮缩放
- Ctrl/Cmd + 滚轮精细缩放
- 触摸板双指缩放
- 滚动条滚动
- 自动居中缩放

## 快捷键

- `鼠标滚轮`: 缩放
- `Ctrl/Cmd + 滚轮`: 精细缩放
- `Shift + 滚轮`: 水平滚动

## 配置选项

```javascript
new Diagram({
  zoomScroll: {
    enabled: true,
    zoom: {
      min: 0.2,
      max: 4,
    },
  },
});
```

## 使用示例

```javascript
const canvas = diagram.get("canvas");

// 缩放到指定级别
canvas.zoom(1.5);

// 缩放到适应内容
canvas.zoom("fit-viewport");

// 滚动
canvas.scroll({ dx: 100, dy: 50 });
```

## 相关模块

- `Canvas`: 执行缩放和滚动
- `MoveCanvas`: 画布平移
- `EditorActions`: 提供缩放操作
