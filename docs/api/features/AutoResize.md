# AutoResize

自动调整大小，当子元素超出边界时自动扩展父元素。

## 模块说明

`AutoResize` 监听子元素的变化，自动调整父容器的大小以适应内容。

## 模块依赖

```javascript
AutoResize.$inject = ["eventBus", "modeling", "rules"];
```

## 主要功能

- 子元素移动超出边界时扩展父元素
- 子元素删除后可选缩小父元素
- 支持最小尺寸约束

## 配置

```javascript
// 在元素上设置
shape.autoResize = "nwse"; // 允许所有方向调整
```

## 相关模块

- `Resize`: 调整大小功能
- `Modeling`: 执行调整操作
