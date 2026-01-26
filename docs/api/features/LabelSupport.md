# LabelSupport

标签支持，提供元素标签的管理和编辑功能。

## 模块说明

`LabelSupport` 处理元素标签的创建、定位和编辑。

## 模块依赖

```javascript
LabelSupport.$inject = ["eventBus", "modeling"];
```

## 主要功能

- 自动创建和定位标签
- 元素移动时同步移动标签
- 支持外部标签和内部标签

## 使用示例

```javascript
// 创建标签
const label = modeling.createLabel(
  element,
  { x: 100, y: 200 },
  {
    text: "标签文本",
  },
);
```

## 相关模块

- `Modeling.createLabel()`: 创建标签
- `Text`: 文本渲染
- `DirectEditing`: 直接编辑标签
