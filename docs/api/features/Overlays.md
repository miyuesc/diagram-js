# Overlays

覆盖层，提供在元素上显示自定义HTML内容的功能。

## 模块说明

`Overlays` 允许在图表元素上附加HTML覆盖层，用于显示徽章、提示、状态等信息。

## 模块依赖

```javascript
Overlays.$inject = ["eventBus", "canvas", "elementRegistry"];
```

## 主要API

### add(element, type, overlay)

添加覆盖层。

**参数**:

- `element` - 目标元素或ID
- `type` - 覆盖层类型
- `overlay` - 覆盖层配置

**覆盖层配置**:

```javascript
{
  position: { top: 0, left: 0 },  // 位置
  html: '<div>...</div>',         // HTML内容
 show: { min: 0.7, max: 5 }      // 显示的缩放范围
}
```

### remove(id)

删除覆盖层。

### get(id)

获取覆盖层。

## 使用示例

```javascript
const overlays = diagram.get("overlays");

// 添加错误徽章
overlays.add(element, "error", {
  position: { top: -12, right: 12 },
  html: '<div class="error-badge">!</div>',
});

// 添加提示信息
const overlayId = overlays.add(element, "note", {
  position: { bottom: 10, left: 10 },
  html: '<div class="note">重要说明</div>',
  show: { min: 0.8 }, // 缩放>80%时显示
});

// 删除覆盖层
overlays.remove(overlayId);
```

## 相关模块

- `Tooltips`: 提示框
- `Canvas`: 管理覆盖层容器
