# DistributeElements

分布元素，提供均匀分布多个元素的功能。

## 模块说明

`DistributeElements` 提供了将多个选中元素在指定轴向上均匀分布的功能。

## 模块依赖

```javascript
DistributeElements.$inject = ["modeling"];
```

## 分布方式

- 水平分布：沿 x 轴均匀分布
- 垂直分布：沿 y 轴均匀分布

## 使用示例

```javascript
const distributeElements = diagram.get("distributeElements");
const selection = diagram.get("selection");

const elements = selection.get();

// 水平均匀分布
distributeElements.trigger(elements, "horizontal");

// 垂直均匀分布
distributeElements.trigger(elements, "vertical");
```

## 通过 Modeling 使用

```javascript
modeling.distributeElements(groups, "x", "width");
modeling.distributeElements(groups, "y", "height");
```

## 相关模块

- `Modeling.distributeElements()`: 底层分布实现
- `AlignElements`: 元素对齐
