# ConnectionPreview

连接预览，显示连接线创建过程的预览。

## 模块说明

`ConnectionPreview` 在创建连接时显示预览线，提供视觉反馈。

## 模块依赖

```javascript
ConnectionPreview.$inject = ["canvas", "graphicsFactory"];
```

## 主要功能

- 拖拽连接时显示预览线
- 目标有效性的视觉反馈
- 自动计算预览路径

##使用示例

预览由 Connect 和 GlobalConnect 模块自动使用，无需手动调用。

## 相关模块

- `Connect`: 使用连接预览
- `GlobalConnect`: 使用连接预览
- `Canvas`: 管理预览层
