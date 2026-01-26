# Rules

规则引擎，提供建模操作的验证和约束。

## 模块说明

`Rules` 定义和验证建模操作的规则，决定哪些操作是允许的。

## 模块依赖

```javascript
Rules.$inject = ["eventBus"];
```

## 主要API

### allowed(action, context)

检查操作是否允许。

**参数**:

- `action` - 操作类型（如 'elements.move'）
- `context` - 操作上下文

**返回值**: `true`（允许）/ `false`（禁止）/ `null`（忽略）

### addRule(actions, priority, fn)

添加规则。

## 使用示例

```javascript
const rules = diagram.get("rules");

// 添加移动规则
rules.addRule("elements.move", function (context) {
  const shapes = context.shapes;
  const target = context.target;

  // 不允许移动到根元素
  if (target && target.type === "root") {
    return false;
  }

  return true;
});

// 检查规则
const canMove = rules.allowed("elements.move", {
  shapes: [shape],
  target: target,
});
```

## 常用规则事件

- `elements.move`: 移动元素
- `elements.create`: 创建元素
- `elements.delete`: 删除元素
- `connection.create`: 创建连接
- `connection.reconnect`: 重新连接
- `shape.resize`: 调整大小
- `shape.attach`: 附着元素

## 相关模块

- `Modeling`: 所有建模操作都会检查规则
- `RuleProvider`: 自定义规则提供器
