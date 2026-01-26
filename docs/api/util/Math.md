# Math

数学工具，提供数学计算辅助函数。

## 模块说明

`Math` 提供了一些辅助数学计算函数。

## 模块依赖

此模块为纯工具函数模块，无外部依赖。

## 公共方法

### log10()

**作用**: 计算以10为底的对数。

**参数**:

- `x` `{number}`: 输入值

**返回值**: `{number}` - log₁₀(x)

**示例**:

```javascript
import { log10 } from "diagram-js/lib/util/Math";

log10(100); // 2
log10(1000); // 3
log10(10); // 1
```

---

### substract()

**作用**: 计算两个点之间的差值（别名为 `delta`）。

**说明**: 此方法从 `PositionUtil.delta` 导出。

**示例**:

```javascript
import { substract } from "diagram-js/lib/util/Math";

const diff = substract({ x: 100, y: 200 }, { x: 50, y: 80 });
// { x: 50, y: 120 }
```

## 相关模块

- `PositionUtil`: 提供位置计算功能
