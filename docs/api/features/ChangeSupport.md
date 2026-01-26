# ChangeSupport

变更支持，追踪和报告模型变更。

## 模块说明

`ChangeSupport` 追踪模型变更，提供变更检测和报告功能。

## 模块依赖

```javascript
ChangeSupport.$inject = ["eventBus"];
```

## 主要功能

- 追踪元素的添加、修改、删除
- 生成变更摘要
- 检测模型是否被修改

## 事件

### elements.changed

元素变更时触发，携带变更的元素列表。

## 使用示例

```javascript
eventBus.on("elements.changed", function (event) {
  const changedElements = event.elements;
  console.log("变更了", changedElements.length, "个元素");

  // 标记模型为已修改
  markAsDirty();
});
```

## 相关模块

- `CommandStack`: 命令执行时触发变更
- `Modeling`: 所有建模操作都会触发变更
