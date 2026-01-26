# AttachSupport

附着支持，提供元素附着到其他元素的功能。

## 模块说明

`AttachSupport` 处理元素的附着关系，如边界事件附着到任务上。

## 模块依赖

```javascript
AttachSupport.$inject = ["eventBus", "modeling"];
```

## 主要功能

- 管理元素的附着关系
- 宿主元素调整大小时更新附着元素位置
- 宿主元素移动时同步移动附着元素

## 使用示例

```javascript
// 创建附着元素
modeling.createShape(boundaryEvent, position, host, {
  attach: true,
});

// 更新附着关系
modeling.updateAttachment(element, newHost);
```

## 相关模块

- `Modeling.updateAttachment()`: 更新附着
- `AttachUtil`: 附着位置计算
