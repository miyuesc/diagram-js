# AlignElements

对齐元素，提供多个元素的对齐功能。

## 模块说明

`AlignElements` 提供了将多个选中元素按照指定方式对齐的功能。

## 模块依赖

```javascript
AlignElements.$inject = ["modeling"];
```

## 对齐方式

- `left`: 左对齐
- `center`: 水平居中
- `right`: 右对齐
- `top`: 顶部对齐
- `middle`: 垂直居中
- `bottom`: 底部对齐

## 使用示例

```javascript
const alignElements = diagram.get("alignElements");
const selection = diagram.get("selection");

// 左对齐
alignElements.trigger(selection.get(), "left");

// 水平居中
alignElements.trigger(selection.get(), "center");

// 垂直居中
alignElements.trigger(selection.get(), "middle");
```

## 通过 Modeling 使用

```javascript
modeling.alignElements(elements, { left: true });
modeling.alignElements(elements, { center: true, middle: true });
```

## 相关模块

- `Modeling.alignElements()`: 底层对齐实现
- `DistributeElements`: 元素分布
