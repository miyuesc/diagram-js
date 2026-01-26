# IdGenerator

ID 生成器，提供唯一ID生成功能。

## 模块说明

`IdGenerator` 是一个简单的ID生成器类，用于生成带前缀的唯一标识符。生成的ID包含可选前缀、随机数和递增计数器，确保唯一性。

## 模块依赖

此模块为纯工具类，无外部依赖。

## 构造函数

### IdGenerator()

**作用**: 创建ID生成器实例。

**参数**:

- `prefix` `{string}` (可选): ID前缀，用于提高可读性

**说明**:

- ID格式: `{prefix}-{random}-{counter}`
- Random: 随机9位数字（0-999999999）
- Counter: 从1开始的递增计数器

**示例**:

```javascript
import IdGenerator from "diagram-js/lib/util/IdGenerator";

const idGen = new IdGenerator("shape");
```

## 公共方法

### next()

**作用**: 生成下一个唯一ID。

**返回值**: `{string}` - 生成的ID

**示例**:

```javascript
const idGen1 = new IdGenerator("shape");
idGen1.next(); // 'shape-123456789-1'
idGen1.next(); // 'shape-123456789-2'
idGen1.next(); // 'shape-123456789-3'

const idGen2 = new IdGenerator();
idGen2.next(); // '987654321-1'  (无前缀)
```

## 使用建议

1. **每种元素类型使用专用生成器**: 为不同类型的元素创建独立的生成器
2. **设置有意义的前缀**: 使用描述性前缀，便于调试

## 典型用法

```javascript
import IdGenerator from "diagram-js/lib/util/IdGenerator";

class CustomElementFactory {
  constructor() {
    this._shapeIdGenerator = new IdGenerator("shape");
    this._connectionIdGenerator = new IdGenerator("connection");
  }

  createShape() {
    return {
      id: this._shapeIdGenerator.next(),
      type: "shape",
    };
  }

  createConnection() {
    return {
      id: this._connectionIdGenerator.next(),
      type: "connection",
    };
  }
}
```
