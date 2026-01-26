# SearchPad

搜索面板，提供可视化搜索界面。

## 模块说明

`SearchPad` 提供搜索输入框和结果导航UI。

## 模块依赖

```javascript
SearchPad.$inject = ["eventBus", "search", "canvas", "selection"];
```

## 主要功能

- 搜索输入框
- 搜索结果计数
- 上一个/下一个结果导航
- 快捷键支持

## 快捷键

- `Ctrl+F / Cmd+F`: 打开搜索
- `Enter`: 下一个结果
- `Shift+Enter`: 上一个结果
- `Esc`: 关闭搜索

## 配置选项

```javascript
new Diagram({
  searchPad: {
    enabled: true,
  },
});
```

## 相关模块

- `Search`: 搜索功能
- `Keyboard`: 快捷键绑定
