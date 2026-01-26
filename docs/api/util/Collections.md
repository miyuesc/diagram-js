# Collections

集合操作工具，提供安全的数组元素添加、删除和查找功能。

## 模块说明

`Collections` 提供了一组用于操作集合（数组）的工具函数，这些函数都包含了空值检查，确保操作的安全性。

## 模块依赖

此模块为纯工具函数模块，无外部依赖。

## 公共方法

### add()

**作用**: 安全地向集合中添加元素，确保元素不重复或插入到指定位置。

**参数**:

- `collection` `{Array<Object>}`: 目标集合
- `element` `{Object}`: 要添加的元素
- `idx` `{number}` (可选): 插入位置索引，-1 或不指定表示添加到末尾

**说明**:

- 如果元素已存在且未指定索引，不执行任何操作
- 如果元素已存在但索引不同，先移除再插入到新位置
- 如果集合或元素为空，不执行任何操作

**示例**:

```javascript
import { add } from "diagram-js/lib/util/Collections";

const collection = ["a", "b", "c"];

// 添加到末尾
add(collection, "d"); // ['a', 'b', 'c', 'd']

// 插入到指定位置
add(collection, "x", 1); // ['a', 'x', 'b', 'c', 'd']

// 移动已存在的元素
add(collection, "b", 0); // ['b', 'a', 'x', 'c', 'd']

// 元素已存在且未指定索引，不会添加
add(collection, "b"); // ['b', 'a', 'x', 'c', 'd'] 不变
```

---

### remove()

**作用**: 安全地从集合中移除元素。

**参数**:

- `collection` `{Array<Object>}` (可选): 目标集合
- `element` `{Object}` (可选): 要移除的元素

**返回值**: `{number}` - 元素之前的索引，如果未找到或参数为空返回 -1

**示例**:

```javascript
import { remove } from "diagram-js/lib/util/Collections";

const collection = ["a", "b", "c"];

// 移除元素
const idx = remove(collection, "b"); // idx = 1, collection = ['a', 'c']

// 尝试移除不存在的元素
const idx2 = remove(collection, "x"); // idx2 = -1, collection 不变

// 集合或元素为空
const idx3 = remove(null, "a"); // idx3 = -1
```

---

### indexOf()

**作用**: 安全地获取元素在集合中的索引。

**参数**:

- `collection` `{Array<Object>}`: 目标集合
- `element` `{Object}`: 要查找的元素

**返回值**: `{number}` - 元素的索引，如果未找到或参数为空返回 -1

**示例**:

```javascript
import { indexOf } from "diagram-js/lib/util/Collections";

const collection = ["a", "b", "c"];

indexOf(collection, "b"); // 1
indexOf(collection, "x"); // -1
indexOf(null, "a"); // -1
indexOf(collection, null); // -1
```

## 使用建议

1. **安全的集合操作**: 这些方法都进行了空值检查，可以安全地用于可能为空的集合
2. **避免重复**: `add()` 方法确保不会添加重复元素（除非移动位置）
3. **位置控制**: 使用 `idx` 参数精确控制元素在集合中的位置

## 典型用法

### 管理子元素列表

```javascript
import { add, remove } from "diagram-js/lib/util/Collections";

// 添加子元素
add(parent.children, child);

// 将子元素移动到第一个位置
add(parent.children, child, 0);

// 移除子元素
remove(parent.children, child);
```

### 管理连接线列表

```javascript
import { add, remove } from "diagram-js/lib/util/Collections";

// 添加输出连接
add(shape.outgoing, connection);

// 移除输入连接
remove(shape.incoming, connection);
```
