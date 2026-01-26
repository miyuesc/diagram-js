# Removal

移除工具，提供安全的集合清空功能。

## 模块说明

`Removal` 提供了一个用于安全清空集合的工具函数，可以处理移除操作可能影响集合本身的情况。

## 模块依赖

此模块为纯工具函数模块，无外部依赖。

## 公共方法

### saveClear()

**作用**: 安全地清空集合，依次移除所有元素。

**参数**:

- `collection` `{Object[]}` (可选): 要清空的集合
- `removeFn` `{Function}`: 移除函数 `(element) => void`

**返回值**: `{Object[]}` - 清空后的集合

**说明**:

- 从集合开头逐个移除元素，直到集合为空
- 处理移除操作可能同时移除多个元素的情况
- 如果集合为空或未定义，直接返回
- removeFn 必须是函数，否则抛出错误

**示例**:

```javascript
import { saveClear } from "diagram-js/lib/util/Removal";

// 基本用法
const elements = [elem1, elem2, elem3];
saveClear(elements, function (element) {
  canvas.removeShape(element);
});
// elements 现在是空数组
```

## 为什么需要 saveClear？

在某些情况下，移除一个元素可能会触发其他元素的移除（例如级联删除）：

```javascript
// 问题场景：简单的循环可能会遗漏元素
const elements = parent.children.slice();
elements.forEach((element) => {
  // removeShape 可能同时移除 element 的子元素
  // 这些子元素也在 elements 数组中
  canvas.removeShape(element);
});
// 一些元素可能没有被正确移除

// 解决方案：使用 saveClear
saveClear(parent.children, function (element) {
  canvas.removeShape(element);
});
// 所有元素都被正确移除
```

## 使用场景

### 清空画布

```javascript
import { saveClear } from "diagram-js/lib/util/Removal";

function clearCanvas() {
  const rootElement = canvas.getRootElement();

  // 安全地移除所有子元素
  saveClear(rootElement.children, function (element) {
    if (element.waypoints) {
      canvas.removeConnection(element);
    } else {
      canvas.removeShape(element);
    }
  });
}
```

### 清除选中元素

```javascript
import { saveClear } from "diagram-js/lib/util/Removal";

function deleteSelected() {
  const selected = selection.get();

  saveClear(selected, function (element) {
    modeling.removeElement(element);
  });

  selection.select(null);
}
```

### 清除父元素的所有子元素

```javascript
import { saveClear } from "diagram-js/lib/util/Removal";

function removeAllChildren(parent) {
  saveClear(parent.children, function (child) {
    // 移除子元素可能会自动移除它的后代
    // saveClear 会正确处理这种情况
    modeling.removeShape(child);
  });
}
```

## 注意事项

1. **removeFn 必须是函数**: 否则会抛出错误
2. **从头开始移除**: 总是移除 `collection[0]`，确保正确处理级联删除
3. **修改原集合**: 直接修改传入的集合，而不是创建副本

## 相关模块

- `Collections.remove()`: 从集合中移除单个元素
- `Canvas.removeShape/removeConnection()`: 常与 saveClear 配合使用
