# PreviewSupport

预览支持，为各种操作提供通用预览功能。

## 模块说明

`PreviewSupport` 提供创建和管理操作预览的通用基础设施。

## 模块依赖

```javascript
PreviewSupport.$inject = ["elementFactory", "canvas", "graphicsFactory"];
```

## 主要功能

- 创建预览元素
- 管理预览层
- 清理预览

## 使用场景

被 Create、Move、Resize 等模块内部使用，提供统一的预览支持。

## 相关模块

- `Create`: 使用预览支持
- `Move`: 使用预览支持
- `ComplexPreview`: 复杂预览场景
