# Outline

轮廓，显示画布的缩略图导航。

## 模块说明

`Outline` 提供画布的缩略图视图，帮助用户导航大型图表。

## 模块依赖

```javascript
Outline.$inject = ["eventBus", "canvas", "elementRegistry"];
```

## 主要API

### open()

打开轮廓面板。

### close()

关闭轮廓面板。

### toggle()

切换轮廓面板显示状态。

## 配置选项

```javascript
new Diagram({
  outline: {
    width: 300,
    height: 200,
  },
});
```

## 使用示例

```javascript
const outline = diagram.get("outline");

// 打开轮廓
outline.open();

// 关闭轮廓
outline.close();
```

## 相关模块

- `Canvas`: 轮廓显示画布内容
- `MoveCanvas`: 点击轮廓导航画布
