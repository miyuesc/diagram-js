# Search

搜索，提供元素搜索功能。

## 模块说明

`Search` 提供在图表中搜索元素的功能。

## 模块依赖

```javascript
Search.$inject = ["eventBus", "selection", "canvas"];
```

## 主要API

### find(pattern)

搜索匹配的元素。

**参数**:

- `pattern` - 搜索模式（字符串或正则）

**返回值**: 匹配的元素数组

## 使用示例

```javascript
const search = diagram.get("search");

// 搜索元素
const results = search.find("task");

// 选中搜索结果
selection.select(results);
```

## 相关模块

- `SearchPad`: 搜索UI面板
- `Selection`: 选中搜索结果
