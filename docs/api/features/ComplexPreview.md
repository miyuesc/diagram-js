# ComplexPreview

复杂预览，处理包含多个元素的预览场景。

## 模块说明

`ComplexPreview` 处理复杂的预览场景，如同时预览多个被移动的元素。

## 模块依赖

```javascript
ComplexPreview.$inject = ["canvas", "graphicsFactory", "previewSupport"];
```

## 主要功能

- 批量预览多个元素
- 保持元素间的相对位置
- 高效的预览渲染

## 使用场景

内部被 Move、CopyPaste 等模块使用，处理多元素预览。

## 相关模块

- `PreviewSupport`: 基础预览功能
- `Move`: 使用复杂预览
