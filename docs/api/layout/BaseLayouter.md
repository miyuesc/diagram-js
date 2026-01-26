# BaseLayouter

基础布局器，提供连接线布局的基类。

## 模块说明

`BaseLayouter` 是连接线布局器的基类，定义了布局接口。

## 接口方法

### layoutConnection(connection, hints)

布局连接线，返回新的路径点。

**参数**:

- `connection` `{Connection}`: 连接线
- `hints` `{Object}`: 布局提示

**返回值**: `{Point[]}` - 新的路径点数组

## 实现示例

```javascript
class CustomLayouter extends BaseLayouter {
  layoutConnection(connection, hints) {
    const source = connection.source;
    const target = connection.target;

    // 计算路径点
    const waypoints = [
      { x: source.x + source.width, y: source.y + source.height / 2 },
      { x: target.x, y: target.y + target.height / 2 },
    ];

    return waypoints;
  }
}
```

## 相关模块

- `ManhattanLayout`: Manhattan 布局实现
- `ConnectionDocking`: 连接点计算
