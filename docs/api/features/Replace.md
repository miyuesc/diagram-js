# Replace

替换元素，提供元素类型替换功能。

## 模块说明

`Replace` 允许将一个元素替换为另一种类型，保留连接和位置。

## 模块依赖

```javascript
Replace.$inject = ["modeling"];
```

## 主要API

### replaceElement(oldElement, newElement, options)

替换元素。

## 使用示例

```javascript
const replace = diagram.get("replace");

// 将任务替换为服务任务
const newShape = replace.replaceElement(task, {
  type: "bpmn:ServiceTask",
});
```

## 相关模块

- `Modeling.replaceShape()`: 底层实现
- `ContextPad`: 可能包含替换工具
- `PopupMenu`: 显示替换选项
