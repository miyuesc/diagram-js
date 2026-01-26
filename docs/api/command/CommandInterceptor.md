# CommandInterceptor

命令拦截器，用于在命令执行的不同阶段插入自定义逻辑。

## 模块说明

`CommandInterceptor` 是一个基础类，允许你在命令执行的各个阶段（canExecute、preExecute、execute、postExecute、revert 等）插入自定义处理逻辑。这对于扩展、验证和监听命令执行非常有用。

## 模块依赖

```javascript
CommandInterceptor.$inject = ["eventBus"];
```

- `eventBus` `{EventBus}`: 事件总线

## 命令执行阶段

CommandInterceptor 支持以下执行阶段：

1. **canExecute**: 验证命令是否可执行
2. **preExecute**: 命令执行前的预处理
3. **preExecuted**: 预处理完成后
4. **execute**: 实际执行命令
5. **executed**: 命令执行完成后
6. **postExecute**: 命令执行后的后处理
7. **postExecuted**: 后处理完成后
8. **revert**: 撤销命令
9. **reverted**: 撤销完成后

## 公共方法

### on()

**作用**: 通用方法，在指定阶段注册拦截器。

**参数**:

- `events` `{string | string[]}` (可选): 要拦截的命令名称
- `hook` `{string}` (可选): 执行阶段名称
- `priority` `{number}` (可选): 优先级，默认1000
- `handlerFn` `{Function}`: 处理函数
- `unwrap` `{boolean}` (可选): 是否解包事件对象
- `that` `{any}` (可选): 函数执行上下文

**示例**:

```javascript
// 拦截所有命令的 execute 阶段
this.on("execute", function (event) {
  console.log("执行命令:", event.command);
});

// 拦截特定命令
this.on("shape.move", "execute", function (event) {
  console.log("移动图形");
});
```

---

### canExecute()

**作用**: 在 canExecute 阶段注册拦截器。

**参数**:

- `events` `{string | string[]}` (可选): 命令名称
- `priority` `{number}` (可选): 优先级
- `handlerFn` `{Function}`: 处理函数
- `unwrap` `{boolean}` (可选): 是否解包
- `that` `{any}` (可选): 上下文

**示例**:

```javascript
this.canExecute("shape.delete", function (context) {
  // 验证是否可删除
  return context.shape.deletable !== false;
});
```

---

### preExecute()

**作用**: 在 preExecute 阶段注册拦截器。

**示例**:

```javascript
this.preExecute("shape.move", function (context) {
  // 移动前的准备工作
  console.log("准备移动图形");
});
```

---

### execute()

**作用**: 在 execute 阶段注册拦截器。

**示例**:

```javascript
this.execute("shape.create", function (context) {
  console.log("创建图形:", context.shape.id);
});
```

---

### executed()

**作用**: 在 executed 阶段注册拦截器。

**示例**:

```javascript
this.executed(["shape.move", "shape.resize"], function (context) {
  // 更新相关元素
  updateRelatedElements(context.shape);
});
```

---

### postExecute()

**作用**: 在 postExecute 阶段注册拦截器。

---

### postExecuted()

**作用**: 在 postExecuted 阶段注册拦截器。

---

### revert()

**作用**: 在 revert 阶段注册拦截器。

---

### reverted()

**作用**: 在 reverted 阶段注册拦截器。

## 实现示例

### 基本拦截器

```javascript
import CommandInterceptor from "diagram-js/lib/command/CommandInterceptor";

class CommandLogger extends CommandInterceptor {
  constructor(eventBus) {
    super(eventBus);

    // 记录所有命令执行
    this.execute(function (event) {
      console.log("执行命令:", event.command, event.context);
    });

    // 记录所有撤销操作
    this.revert(function (event) {
      console.log("撤销命令:", event.command);
    });
  }
}

CommandLogger.$inject = ["eventBus"];
```

### 验证拦截器

```javascript
class ValidationInterceptor extends CommandInterceptor {
  constructor(eventBus) {
    super(eventBus);

    // 验证图形移动
    this.canExecute("shape.move", 1500, function (context) {
      const shape = context.shape;

      if (shape.locked) {
        return false; // 阻止执行
      }
    });

    // 验证图形删除
    this.canExecute("shape.delete", function (context) {
      return context.shape.deletable !== false;
    });
  }
}

ValidationInterceptor.$inject = ["eventBus"];
```

### 自动布局拦截器

```javascript
class AutoLayoutInterceptor extends CommandInterceptor {
  constructor(eventBus, modeling) {
    super(eventBus);

    this._modeling = modeling;

    // 移动图形后自动更新连接线
    this.postExecuted(
      "shape.move",
      function (event) {
        const shape = event.context.shape;
        const connections = [].concat(
          shape.incoming || [],
          shape.outgoing || [],
        );

        connections.forEach((c) => {
          this._modeling.layoutConnection(c);
        });
      },
      this,
    );
  }
}

AutoLayoutInterceptor.$inject = ["eventBus", "modeling"];
```

## 事件解包

当 `unwrap` 参数为 `true` 时，处理函数接收的参数会被解包：

```javascript
// 不解包（默认）
this.execute("shape.move", function (event) {
  const context = event.context;
  const command = event.command;
});

// 解包
this.execute(
  "shape.move",
  function (context, command, event) {
    // 直接访问 context 和 command
  },
  true,
);
```

## 优先级

优先级决定了拦截器的执行顺序：

- 数值越大，优先级越高（越早执行）
- 默认优先级：1000
- 验证逻辑通常使用高优先级（> 1000）
- 清理/日志逻辑使用低优先级（< 1000）

## 使用建议

1. **继承 CommandInterceptor**: 扩展此类而不是直接使用
2. **在构造函数中注册**: 所有拦截器应在构造函数中注册
3. **使用适当优先级**: 验证用高优先级，日志用低优先级
4. **返回 false 阻止执行**: 在 canExecute 中返回 false 阻止命令
5. **避免在 execute/revert 中执行命令**: 使用 pre/postExecute 代替

## 相关模块

- `CommandStack`: 使用 CommandInterceptor 扩展命令执行
- `EventBus`: CommandInterceptor 底层使用事件总线
