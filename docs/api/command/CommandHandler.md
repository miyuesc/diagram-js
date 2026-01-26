# CommandHandler

命令处理器接口，定义了命令的执行、撤销和验证逻辑。

## 模块说明

`CommandHandler` 是一个 TypeScript 接口，定义了如何处理特定命令的规范。命令处理器通过 `CommandStack.registerHandler()` 注册，负责实现命令的执行和撤销逻辑。

## TypeScript 接口

```typescript
interface CommandHandler {
  /** 执行命令 */
  execute?(context: CommandContext): ElementLike[];

  /** 撤销命令 */
  revert?(context: CommandContext): ElementLike[];

  /** 检查命令是否可执行 */
  canExecute?(context: CommandContext): boolean;

  /** 命令执行前的预处理 */
  preExecute?(context: CommandContext): void;

  /** 命令执行后的后处理 */
  postExecute?(context: CommandContext): void;
}
```

## 接口方法

### execute()

**作用**: 执行命令描述的变更操作。

**参数**:

- `context` `{CommandContext}`: 命令上下文对象，包含执行命令所需的所有数据

**返回值**: `{ElementLike[]}` - 已变更的元素列表

**说明**:

- 必须正确实现变更逻辑
- 返回所有受影响的元素，用于变更追踪

---

### revert()

**作用**: 撤销命令描述的变更操作。

**参数**:

- `context` `{CommandContext}`: 命令上下文对象

**返回值**: `{ElementLike[]}` - 已变更的元素列表

**说明**:

- 必须完全撤销 `execute()` 的所有变更
- 确保撤销链不被破坏

---

### canExecute()

**作用**: 检查命令是否可以执行。

**参数**:

- `context` `{CommandContext}`: 命令上下文对象

**返回值**: `{boolean}` - `true` 表示可以执行，`false` 表示不能执行

**说明**: 用于在执行前验证命令的前置条件。

---

### preExecute()

**作用**: 在实际命令执行前执行的预处理操作。

**参数**:

- `context` `{CommandContext}`: 命令上下文对象

**说明**:

- 可以执行其他命令
- 会与主命令一起撤销/重做

---

### postExecute()

**作用**: 在实际命令执行后执行的后处理操作。

**参数**:

- `context` `{CommandContext}`: 命令上下文对象

**说明**:

- 可以执行其他命令
- 会与主命令一起撤销/重做

## 实现示例

```typescript
class MoveShapeHandler implements CommandHandler {
  execute(context: CommandContext) {
    const shape = context.shape;
    const delta = context.delta;

    // 保存原始位置用于撤销
    context.oldPosition = { x: shape.x, y: shape.y };

    // 执行移动
    shape.x += delta.x;
    shape.y += delta.y;

    return [shape];
  }

  revert(context: CommandContext) {
    const shape = context.shape;
    const oldPosition = context.oldPosition;

    // 恢复原始位置
    shape.x = oldPosition.x;
    shape.y = oldPosition.y;

    return [shape];
  }

  canExecute(context: CommandContext) {
    return !!context.shape && !!context.delta;
  }
}

// 注册处理器
commandStack.registerHandler("shape.move", MoveShapeHandler);
```

## 使用建议

1. **返回受影响的元素**: `execute()` 和 `revert()` 必须返回所有变更的元素
2. **保存撤销信息**: 在 `execute()` 中将撤销所需的信息保存到 `context`
3. **不在核心方法中调用命令**: 不要在 `execute()` 或 `revert()` 中执行其他命令
4. **使用 pre/postExecute**: 需要执行其他命令时使用这些钩子
5. **实现完整撤销**: 确保 `revert()` 完全撤销 `execute()` 的所有变更
