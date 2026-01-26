# RootElements

根元素管理，管理多个根元素（多页面支持）。

## 模块说明

`RootElements` 管理多个根元素，支持多页面/多画布场景。

## 模块依赖

```javascript
RootElements.$inject = ["canvas"];
```

## 主要功能

- 管理多个根元素
- 根元素切换
- 每个根元素独立的元素树

## 使用示例

```javascript
const canvas = diagram.get("canvas");

// 创建多个根元素
const page1 = elementFactory.createRoot({ id: "page1" });
const page2 = elementFactory.createRoot({ id: "page2" });

// 添加根元素
canvas.addRootElement(page1);
canvas.addRootElement(page2);

// 切换根元素
canvas.setRootElement(page2);

// 获取所有根元素
const roots = canvas.getRootElements();
```

## 相关模块

- `Canvas`: 管理根元素
- `ElementFactory`: 创建根元素
