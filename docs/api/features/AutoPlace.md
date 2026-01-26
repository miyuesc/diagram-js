# AutoPlace

自动放置，提供智能定位新元素的功能。

## 模块说明

`AutoPlace` 自动计算新创建元素的最佳位置，避免与现有元素重叠。

## 模块依赖

```javascript
AutoPlace.$inject = ["eventBus", "modeling"];
```

## 主要API

### append(source, shape)

在源元素旁边自动放置新元素。

## 使用示例

```javascript
const autoPlace = diagram.get("autoPlace");

const newShape = autoPlace.append(sourceElement, {
  type: "bpmn:Task",
  width: 100,
  height: 80,
});
```

## 相关模块

- `Modeling.appendShape()`: 底层实现
- `ContextPad`: 使用 AutoPlace 放置新元素
