# 扩展开发指南

## 概述

diagram-js 的设计目标之一就是高度可扩展。通过模块化架构和依赖注入，你可以轻松地扩展现有功能或添加全新的功能。

本指南将介绍：

- 如何创建自定义模块
- 如何扩展现有服务
- 如何实现自定义渲染
- 实战案例与最佳实践

## 扩展方式

### 1. 创建自定义模块

自定义模块是扩展 diagram-js 的主要方式。

#### 基本模块结构

```typescript
// custom-module/CustomFeature.ts
export default class CustomFeature {
  static $inject = ["eventBus", "canvas"];

  constructor(
    private eventBus: EventBus,
    private canvas: Canvas,
  ) {
    this.init();
  }

  private init(): void {
    this.eventBus.on("element.click", (event) => {
      console.log("Element clicked:", event.element);
    });
  }

  public doSomething(): void {
    // 自定义功能实现
  }
}
```

#### 模块定义

```typescript
// custom-module/index.ts
import CustomFeature from "./CustomFeature";

export default {
  __depends__: [require("diagram-js/lib/core")],
  __init__: ["customFeature"],
  customFeature: ["type", CustomFeature],
};
```

#### 使用自定义模块

```typescript
import Diagram from "diagram-js";
import CustomModule from "./custom-module";

const diagram = new Diagram({
  canvas: { container: "#canvas" },
  modules: [CustomModule],
});
```

### 2. 扩展现有服务

通过继承或装饰器模式扩展现有服务。

#### 扩展 Modeling 服务

```typescript
import Modeling from "diagram-js/lib/features/modeling/Modeling";

export default class CustomModeling extends Modeling {
  static $inject = ["eventBus", "commandStack", "elementFactory"];

  // 添加新方法
  createCustomShape(attrs: any): Shape {
    return this.createShape({
      ...attrs,
      type: "custom:Shape",
    });
  }

  // 覆盖现有方法
  moveElements(elements: Element[], delta: Point, target?: Shape): void {
    // 添加自定义逻辑
    console.log("Moving elements with custom logic");

    // 调用父类方法
    super.moveElements(elements, delta, target);
  }
}
```

#### 替换服务

```typescript
// custom-module/index.ts
import CustomModeling from "./CustomModeling";

export default {
  __depends__: [require("diagram-js/lib/features/modeling")],
  __init__: ["modeling"],
  modeling: ["type", CustomModeling], // 替换默认的 Modeling
};
```

### 3. 自定义渲染器

自定义渲染器允许你完全控制元素的视觉表现。

#### 创建渲染器

```typescript
// custom-renderer/CustomRenderer.ts
import BaseRenderer from "diagram-js/lib/draw/BaseRenderer";
import {
  append as svgAppend,
  attr as svgAttr,
  create as svgCreate,
} from "tiny-svg";

const HIGH_PRIORITY = 1500;

export default class CustomRenderer extends BaseRenderer {
  static $inject = ["eventBus", "styles"];

  constructor(eventBus: EventBus, styles: any) {
    super(eventBus, HIGH_PRIORITY);
    this.styles = styles;
  }

  // 判断是否可以渲染该元素
  canRender(element: Element): boolean {
    return element.type && element.type.startsWith("custom:");
  }

  // 绘制形状
  drawShape(visuals: SVGElement, element: Shape): SVGElement {
    if (element.type === "custom:Circle") {
      return this.drawCircle(visuals, element);
    }

    if (element.type === "custom:Diamond") {
      return this.drawDiamond(visuals, element);
    }

    // 默认矩形
    return this.drawRect(visuals, element);
  }

  // 绘制连接线
  drawConnection(visuals: SVGElement, connection: Connection): SVGElement {
    const path = this.createPath(connection);

    const line = svgCreate("path");
    svgAttr(line, {
      d: path,
      stroke: "#000",
      "stroke-width": 2,
      fill: "none",
    });

    svgAppend(visuals, line);
    return line;
  }

  // 获取元素路径（用于连接线停靠）
  getShapePath(shape: Shape): string {
    if (shape.type === "custom:Circle") {
      return this.getCirclePath(shape);
    }

    return this.getRectPath(shape);
  }

  // === 私有辅助方法 ===

  private drawCircle(visuals: SVGElement, element: Shape): SVGElement {
    const cx = element.width / 2;
    const cy = element.height / 2;
    const r = Math.min(element.width, element.height) / 2;

    const circle = svgCreate("circle");
    svgAttr(circle, {
      cx,
      cy,
      r,
      fill: "#e3f2fd",
      stroke: "#1976d2",
      "stroke-width": 2,
    });

    svgAppend(visuals, circle);
    return circle;
  }

  private drawDiamond(visuals: SVGElement, element: Shape): SVGElement {
    const w = element.width;
    const h = element.height;

    const path = `M ${w / 2} 0 L ${w} ${h / 2} L ${w / 2} ${h} L 0 ${h / 2} Z`;

    const diamond = svgCreate("path");
    svgAttr(diamond, {
      d: path,
      fill: "#fff3e0",
      stroke: "#f57c00",
      "stroke-width": 2,
    });

    svgAppend(visuals, diamond);
    return diamond;
  }

  private drawRect(visuals: SVGElement, element: Shape): SVGElement {
    const rect = svgCreate("rect");
    svgAttr(rect, {
      x: 0,
      y: 0,
      width: element.width,
      height: element.height,
      rx: 5,
      fill: "#f5f5f5",
      stroke: "#333",
      "stroke-width": 2,
    });

    svgAppend(visuals, rect);
    return rect;
  }

  private createPath(connection: Connection): string {
    const waypoints = connection.waypoints;
    const path = waypoints
      .map((p, idx) => {
        return (idx === 0 ? "M" : "L") + p.x + "," + p.y;
      })
      .join(" ");

    return path;
  }

  private getCirclePath(shape: Shape): string {
    const cx = shape.x + shape.width / 2;
    const cy = shape.y + shape.height / 2;
    const r = Math.min(shape.width, shape.height) / 2;

    return `M ${cx - r} ${cy} 
            A ${r} ${r} 0 1 1 ${cx + r} ${cy}
            A ${r} ${r} 0 1 1 ${cx - r} ${cy} Z`;
  }

  private getRectPath(shape: Shape): string {
    const { x, y, width, height } = shape;
    return `M ${x} ${y} L ${x + width} ${y} L ${x + width} ${y + height} L ${x} ${y + height} Z`;
  }
}
```

#### 注册渲染器

```typescript
// custom-renderer/index.ts
import CustomRenderer from "./CustomRenderer";

export default {
  __depends__: [require("diagram-js/lib/core")],
  __init__: ["customRenderer"],
  customRenderer: ["type", CustomRenderer],
};
```

### 4. 实现自定义 CommandHandler

CommandHandler 用于实现可撤销的操作。

```typescript
// custom-commands/UpdateColorHandler.ts
import {
  CommandHandler,
  CommandContext,
} from "diagram-js/lib/command/CommandHandler";

export default class UpdateColorHandler implements CommandHandler {
  execute(context: CommandContext): any {
    const { element, newColor } = context;

    // 保存旧颜色用于撤销
    context.oldColor = element.businessObject.color;

    // 更新颜色
    element.businessObject.color = newColor;

    return element;
  }

  revert(context: CommandContext): any {
    const { element, oldColor } = context;

    // 恢复旧颜色
    element.businessObject.color = oldColor;

    return element;
  }
}
```

#### 注册 CommandHandler

```typescript
// custom-commands/index.ts
import UpdateColorHandler from "./UpdateColorHandler";

export default {
  __depends__: [require("diagram-js/lib/command")],
  __init__: ["updateColorHandler"],
  updateColorHandler: ["type", UpdateColorHandler],
};

// 在服务中注册
class CommandRegistration {
  static $inject = ["commandStack"];

  constructor(commandStack: CommandStack) {
    commandStack.registerHandler("element.updateColor", UpdateColorHandler);
  }
}
```

## 最佳实践

### 1. 模块设计原则

#### 单一职责

每个模块应该只负责一个功能领域。

```typescript
// ✅ 好的设计：职责清晰
export default {
  __init__: ["customSelection"],
  customSelection: ["type", CustomSelection],
};

// ❌ 不好的设计：职责混杂
export default {
  __init__: ["everythingService"],
  everythingService: ["type", DoEverythingService],
};
```

#### 依赖最小化

只依赖真正需要的服务。

```typescript
// ✅ 好的设计
class CustomFeature {
  static $inject = ['eventBus'];  // 只需要 eventBus

  constructor(eventBus: EventBus) {
    this.eventBus = eventBus;
  }
}

// ❌ 不好的设计
class CustomFeature {
  static $inject = ['eventBus', 'canvas', 'elementRegistry', 'modeling'...];
  // 注入了很多不使用的服务
}
```

### 2. 事件命名规范

使用清晰的命名空间和动词时态。

```typescript
// ✅ 好的命名
eventBus.on("custom.element.created", handler);
eventBus.on("custom.validation.failed", handler);

// ❌ 不好的命名
eventBus.on("myevent", handler);
eventBus.on("dostuff", handler);
```

### 3. TypeScript 类型定义

为自定义模块提供完整的类型定义。

```typescript
// types.ts
export interface CustomElement extends Shape {
  customProperty: string;
  customData?: any;
}

export interface CustomModeling {
  createCustomElement(attrs: Partial<CustomElement>): CustomElement;
  updateCustomProperty(element: CustomElement, value: string): void;
}

// CustomModeling.ts
export default class CustomModeling implements CustomModeling {
  // 实现接口
}
```

### 4. 性能优化

#### 事件防抖和节流

```typescript
import { debounce, throttle } from "min-dash";

class CustomFeature {
  static $inject = ["eventBus"];

  constructor(eventBus: EventBus) {
    // 防抖：等待用户停止操作后执行
    eventBus.on(
      "element.changed",
      debounce((event) => {
        this.handleChange(event);
      }, 300),
    );

    // 节流：限制执行频率
    eventBus.on(
      "canvas.viewbox.changed",
      throttle((event) => {
        this.handleViewboxChange(event);
      }, 100),
    );
  }
}
```

#### 批量操作

```typescript
// ✅ 好的实现：批量执行
modeling.moveElements(selectedElements, delta);

// ❌ 不好的实现：逐个执行
selectedElements.forEach((element) => {
  modeling.moveElements([element], delta);
});
```

## 实战案例

### 案例 1：自定义工具面板（Palette）

创建一个自定义的工具面板，提供专用的元素创建工具。

```typescript
// custom-palette/CustomPalette.ts
export default class CustomPalette {
  static $inject = ["palette", "create", "elementFactory", "handTool"];

  constructor(
    palette: Palette,
    create: Create,
    elementFactory: ElementFactory,
    handTool: HandTool,
  ) {
    palette.registerProvider(this);
  }

  getPaletteEntries(): PaletteEntries {
    const create = this.create;
    const elementFactory = this.elementFactory;

    function createShape(type: string) {
      return function (event: Event) {
        const shape = elementFactory.createShape({
          type: type,
          width: 100,
          height: 80,
        });
        create.start(event, shape);
      };
    }

    return {
      "custom-separator": {
        group: "custom",
        separator: true,
      },
      "create-custom-task": {
        group: "custom",
        className: "custom-icon-task",
        title: "创建任务",
        action: {
          dragstart: createShape("custom:Task"),
          click: createShape("custom:Task"),
        },
      },
      "create-custom-gateway": {
        group: "custom",
        className: "custom-icon-gateway",
        title: "创建网关",
        action: {
          dragstart: createShape("custom:Gateway"),
          click: createShape("custom:Gateway"),
        },
      },
      "hand-tool": {
        group: "tools",
        className: "bpmn-icon-hand-tool",
        title: "激活手型工具",
        action: {
          click: (event) => {
            this.handTool.activateHand(event);
          },
        },
      },
    };
  }
}
```

### 案例 2：自定义上下文菜单（ContextPad）

为特定类型的元素添加自定义的上下文操作。

```typescript
// custom-context-pad/CustomContextPad.ts
export default class CustomContextPad {
  static $inject = ["contextPad", "modeling", "elementFactory", "connect"];

  constructor(
    contextPad: ContextPad,
    private modeling: Modeling,
    private elementFactory: ElementFactory,
    private connect: Connect,
  ) {
    contextPad.registerProvider(this);
  }

  getContextPadEntries(element: Element): ContextPadEntries {
    const modeling = this.modeling;
    const elementFactory = this.elementFactory;
    const connect = this.connect;

    // 只为自定义元素提供上下文菜单
    if (!element.type.startsWith("custom:")) {
      return {};
    }

    return {
      delete: {
        group: "edit",
        className: "context-pad-icon-remove",
        title: "删除元素",
        action: {
          click: function () {
            modeling.removeElements([element]);
          },
        },
      },
      connect: {
        group: "connect",
        className: "context-pad-icon-connect",
        title: "连接",
        action: {
          click: function (event) {
            connect.start(event, element);
          },
        },
      },
      "append-task": {
        group: "model",
        className: "context-pad-icon-task",
        title: "追加任务",
        action: {
          click: function (event) {
            const shape = elementFactory.createShape({
              type: "custom:Task",
              width: 100,
              height: 80,
            });

            modeling.appendShape(element, shape, {
              x: element.x + element.width + 80,
              y: element.y,
            });
          },
        },
      },
    };
  }
}
```

### 案例 3：自定义规则（Rules）

实现自定义的业务规则，控制哪些操作是允许的。

```typescript
// custom-rules/CustomRules.ts
import RuleProvider from "diagram-js/lib/features/rules/RuleProvider";

export default class CustomRules extends RuleProvider {
  static $inject = ["eventBus"];

  constructor(eventBus: EventBus) {
    super(eventBus);
  }

  init(): void {
    // 连接规则
    this.addRule("connection.create", (context) => {
      const { source, target } = context;

      // 不允许连接到自己
      if (source === target) {
        return false;
      }

      // 自定义连接规则
      if (source.type === "custom:Start" && target.type === "custom:End") {
        return true;
      }

      return false;
    });

    // 移动规则
    this.addRule("elements.move", (context) => {
      const { shapes } = context;

      // 不允许移动开始节点
      return shapes.every((shape) => shape.type !== "custom:Start");
    });

    // 删除规则
    this.addRule("elements.delete", (context) => {
      const { elements } = context;

      // 不允许删除开始和结束节点
      return elements.every(
        (element) =>
          element.type !== "custom:Start" && element.type !== "custom:End",
      );
    });
  }
}
```

### 案例 4：领域特定编辑器

构建一个完整的领域特定图表编辑器。

```typescript
// workflow-modeler/index.ts
import CoreModule from "diagram-js/lib/core";
import SelectionModule from "diagram-js/lib/features/selection";
import MoveModule from "diagram-js/lib/features/move";
import ModelingModule from "diagram-js/lib/features/modeling";
import ConnectModule from "diagram-js/lib/features/connect";
import CreateModule from "diagram-js/lib/features/create";
import ContextPadModule from "diagram-js/lib/features/context-pad";
import PaletteModule from "diagram-js/lib/features/palette";

import WorkflowRenderer from "./WorkflowRenderer";
import WorkflowPalette from "./WorkflowPalette";
import WorkflowContextPad from "./WorkflowContextPad";
import WorkflowRules from "./WorkflowRules";

export default {
  __depends__: [
    CoreModule,
    SelectionModule,
    MoveModule,
    ModelingModule,
    ConnectModule,
    CreateModule,
    ContextPadModule,
    PaletteModule,
  ],
  __init__: [
    "workflowRenderer",
    "workflowPalette",
    "workflowContextPad",
    "workflowRules",
  ],
  workflowRenderer: ["type", WorkflowRenderer],
  workflowPalette: ["type", WorkflowPalette],
  workflowContextPad: ["type", WorkflowContextPad],
  workflowRules: ["type", WorkflowRules],
};
```

使用编辑器：

```typescript
import Diagram from "diagram-js";
import WorkflowModeler from "./workflow-modeler";

const modeler = new Diagram({
  canvas: { container: "#canvas" },
  modules: [WorkflowModeler],
});

// 导入数据
modeler.importDefinitions(workflowData);
```

## 调试技巧

### 1. 监听所有事件

```typescript
eventBus.on("*", function (type, event) {
  console.log("Event:", type, event);
});
```

### 2. 检查服务注册

```typescript
// 获取所有服务名称
const services = Object.keys(diagram._container._providers);
console.log("Registered services:", services);

// 检查服务是否存在
if (diagram.get("myService", false)) {
  console.log("myService is registered");
}
```

### 3. 性能分析

```typescript
eventBus.on("commandStack.execute", function (event) {
  console.time(event.command);
});

eventBus.on("commandStack.executed", function (event) {
  console.timeEnd(event.command);
});
```

## 下一步

- 查看 [核心架构详解](/guide/architecture) 深入了解内部机制
- 阅读 [模块依赖关系](/guide/modules) 理解模块系统
- 探索 [工作流程详解](/guide/workflow) 了解数据流转
- 参考 [API 文档](/api/core/Canvas) 查看具体 API 使用
