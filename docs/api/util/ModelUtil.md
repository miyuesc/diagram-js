# ModelUtil

模型工具，提供元素类型判断功能。

## 模块说明

`ModelUtil` 提供了一组用于检查元素类型的工具函数，可以快速判断一个对象是否为特定类型的模型元素。

## 模块依赖

此模块为纯工具函数模块，无外部依赖。

## 公共方法

### isConnection()

**作用**: 检查值是否为连接线元素。

**参数**:

- `value` `{any}`: 要检查的值

**返回值**: `{boolean}` - 是否为连接线

**说明**: 通过检查对象是否有 `waypoints` 属性判断。

**示例**:

```javascript
import { isConnection } from "diagram-js/lib/util/ModelUtil";

isConnection(connection); // true
isConnection(shape); // false
isConnection(null); // false
```

---

### isLabel()

**作用**: 检查值是否为标签元素。

**参数**:

- `value` `{any}`: 要检查的值

**返回值**: `{boolean}` - 是否为标签

**说明**: 通过检查对象是否有 `labelTarget` 属性判断。

**示例**:

```javascript
import { isLabel } from "diagram-js/lib/util/ModelUtil";

isLabel(label); // true
isLabel(shape); // false
```

---

### isRoot()

**作用**: 检查值是否为根元素。

**参数**:

- `value` `{any}`: 要检查的值

**返回值**: `{boolean}` - 是否为根元素

**说明**: 通过检查对象的 `parent` 属性是否为 `null` 或 `undefined` 判断。

**示例**:

```javascript
import { isRoot } from "diagram-js/lib/util/ModelUtil";

isRoot(rootElement); // true
isRoot(childShape); // false
```

## 使用建议

1. **类型检查**: 在处理元素前使用这些函数进行类型检查
2. **条件渲染**: 根据元素类型执行不同的渲染逻辑

## 典型用法

```javascript
import { isConnection, isLabel, isRoot } from "diagram-js/lib/util/ModelUtil";

function renderElement(element) {
  if (isConnection(element)) {
    return renderConnection(element);
  }

  if (isLabel(element)) {
    return renderLabel(element);
  }

  if (isRoot(element)) {
    return renderRoot(element);
  }

  return renderShape(element);
}
```

## 相关模块

- `Elements.getType()`: 获取元素的类型字符串('connection'|'shape'|'root')
