---
layout: home

hero:
  name: diagram-js
  text: 图表工具箱
  tagline: 用于在 Web 上显示和修改图表的强大工具库
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/introduction
    - theme: alt
      text: API 文档
      link: /api/model/

features:
  - icon: 🎨
    title: 灵活的渲染引擎
    details: 基于 SVG 的图形渲染，支持自定义形状、连接线和交互行为
  - icon: 📦
    title: 模块化架构
    details: 采用依赖注入设计，所有功能均可按需加载和定制
  - icon: 🔧
    title: 丰富的功能特性
    details: 内置拖拽、缩放、对齐、吸附等 40+ 个开箱即用的功能模块
  - icon: 🚀
    title: 高性能
    details: 优化的事件系统和渲染机制，支持大规模图表的流畅操作
  - icon: 🎯
    title: 命令模式
    details: 完整的撤销/重做机制，所有修改操作均可追溯和回滚
  - icon: 📝
    title: TypeScript 支持
    details: 完整的类型定义，提供出色的开发体验和代码提示
---

## 快速安装

```bash
npm install diagram-js
```

## 简单示例

```javascript
import Diagram from "diagram-js";

// 创建一个图表实例
const diagram = new Diagram({
  canvas: { container: "#canvas" },
});

// 获取画布服务
const canvas = diagram.get("canvas");

// 创建根元素
const root = canvas.setRootElement({
  id: "root",
});
```

## 核心概念

diagram-js 采用模块化架构，核心概念包括：

- **Model**: 图表元素的数据模型（Shape、Connection、Label 等）
- **Canvas**: 画布服务，负责 SVG 渲染和层级管理
- **EventBus**: 事件总线，所有交互和变更都通过事件传递
- **CommandStack**: 命令栈，实现撤销/重做功能
- **Features**: 功能模块，如拖拽、对齐、吸附等

## 项目链接

- [GitHub 仓库](https://github.com/bpmn-io/diagram-js)
- [问题反馈](https://github.com/bpmn-io/diagram-js/issues)
- [更新日志](https://github.com/bpmn-io/diagram-js/blob/main/CHANGELOG.md)
