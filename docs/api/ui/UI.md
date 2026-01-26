# UI

用户界面，提供基础 UI 组件和交互。

## 模块说明

`UI` 模块提供 diagram-js 的基础用户界面功能，包括画布容器、覆盖层容器等。

## 主要功能

- 画布容器管理
- 覆盖层容器
- 工具提示容器
- SVG 容器结构

## SVG 结构

diagram-js 创建的 SVG 结构：

```html
<div class="djs-container">
  <svg class="djs-canvas">
    <defs></defs>
    <g class="viewport">
      <!-- 画布内容 -->
    </g>
  </svg>
  <div class="djs-overlays">
    <!-- 覆盖层 -->
  </div>
</div>
```

## CSS 类

- `.djs-container`: 根容器
- `.djs-canvas`: SVG 画布
- `.viewport`: 可视区域
- `.djs-overlays`: 覆盖层容器
- `.djs-element`: 元素容器
- `.djs-shape`: 图形元素
- `.djs-connection`: 连接线元素

## 自定义样式

```css
/* 自定义画布样式 */
.djs-container {
  background-color: #f5f5f5;
}

/* 自定义元素样式 */
.djs-shape {
  cursor: pointer;
}

/* 选中状态 */
.djs-shape.selected {
  outline: 2px solid #007bff;
}
```

## 相关模块

- `Canvas`: 管理画布和容器
- `Overlays`: 使用覆盖层容器
- `Tooltips`: 使用提示容器
