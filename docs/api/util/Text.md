# Text

文本渲染工具，提供 SVG 文本布局和渲染功能。

## 模块说明

`Text` 是一个用于创建和布局 SVG 文本的工具类。它支持多行文本、自动换行、文本对齐、内边距等功能，常用于渲染标签文本。

## 模块依赖

此模块依赖 `tiny-svg` 和 `min-dom` 库。

## TypeScript 类型

```typescript
/**
 * 内边距配置
 */
type PaddingConfig =
  | number
  | {
      top?: number;
      left?: number;
      right?: number;
      bottom?: number;
    };

/**
 * 对齐配置
 */
type AlignmentConfig =
  | "center-top"
  | "center-middle"
  | "left-top"
  | "right-top";

/**
 * 文本配置
 */
interface TextConfig {
  /** 默认尺寸 */
  size?: { width: number; height: number };
  /** 内边距 */
  padding?: PaddingConfig;
  /** CSS 样式 */
  style?: Record<string, string | number>;
  /** 对齐方式 */
  align?: AlignmentConfig;
}

/**
 * 布局配置
 */
interface TextLayoutConfig extends TextConfig {
  /** 包围盒 */
  box?: { width: number; height: number };
  /** 是否自适应盒子大小 */
  fitBox?: boolean;
}
```

## 构造函数

### Text()

**作用**: 创建文本工具实例。

**参数**:

- `config` `{TextConfig}` (可选): 默认配置

**示例**:

```javascript
import Text from "diagram-js/lib/util/Text";

const textUtil = new Text({
  size: { width: 150, height: 50 },
  padding: 10,
  align: "center-middle",
  style: {
    fontFamily: "Arial",
    fontSize: "12px",
  },
});
```

## 公共方法

### createText()

**作用**: 创建布局后的 SVG 文本元素。

**参数**:

- `text` `{string}`: 文本内容（支持 `\n` 换行）
- `options` `{TextLayoutConfig}`: 布局选项

**返回值**: `{SVGElement}` - SVG text 元素

**示例**:

```javascript
const textElement = textUtil.createText("Hello\nWorld", {
  box: { width: 100, height: 80 },
  align: "center-middle",
  padding: 5,
});

svgAppend(visual, textElement);
```

---

### getDimensions()

**作用**: 计算文本布局后的尺寸。

**参数**:

- `text` `{string}`: 文本内容
- `options` `{TextLayoutConfig}`: 布局选项

**返回值**: `{Dimensions}` - 尺寸 `{ width, height }`

**示例**:

```javascript
const dimensions = textUtil.getDimensions("Sample Text", {
  box: { width: 150, height: 50 },
});
// { width: 85, height: 20 }
```

---

### layoutText()

**作用**: 创建布局后的文本元素和尺寸信息。

**参数**:

- `text` `{string}`: 文本内容
- `options` `{TextLayoutConfig}`: 布局选项

**返回值**: `{Object}` - `{ element: SVGElement, dimensions: Dimensions }`

**示例**:

```javascript
const result = textUtil.layoutText("Multi\nLine\nText", {
  box: { width: 100, height: 100 },
  padding: { top: 10, left: 5, right: 5, bottom: 10 },
  fitBox: true,
});

console.log(result.dimensions); // { width: 50, height: 60 }
svgAppend(visual, result.element);
```

## 配置选项

### align（对齐）

- `'center-top'`: 水平居中，顶部对齐（默认）
- `'center-middle'`: 水平居中，垂直居中
- `'left-top'`: 左对齐，顶部对齐
- `'right-top'`: 右对齐，顶部对齐

### padding（内边距）

```javascript
// 数字：四边相同
padding: 10

// 对象：分别指定
padding: { top: 10, left: 5, right: 5, bottom: 10 }
```

### fitBox（自适应盒子）

- `true`: 文本宽度自适应内容
- `false`: 文本宽度填满盒子（默认）

### style（样式）

支持标准 SVG 文本样式：

```javascript
style: {
  fontFamily: 'Arial',
  fontSize: '14px',
  fontWeight: 'bold',
  fill: '#000',
  lineHeight: 1.2
}
```

## 特性

### 自动换行

文本会根据盒子宽度自动换行，优先在空格和连字符处断行。

### 软断行

支持软断行符 `\u00AD`（软连字符），在需要时自动转换为连字符。

### 中文支持

完全支持中文和其他Unicode字符。

## 使用场景

### 渲染标签文本

```javascript
import Text from "diagram-js/lib/util/Text";

const textUtil = new Text({
  style: {
    fontFamily: "Arial",
    fontSize: "12px",
    fill: "#000",
  },
});

function renderLabel(visual, element) {
  const text = element.businessObject.name || "";

  const textElement = textUtil.createText(text, {
    box: { width: element.width, height: element.height },
    align: "center-middle",
    padding: 5,
  });

  svgAppend(visual, textElement);
}
```

### 计算标签尺寸

```javascript
import Text from "diagram-js/lib/util/Text";

const textUtil = new Text();

function getLabelSize(labelText) {
  const dimensions = textUtil.getDimensions(labelText, {
    box: { width: 150, height: 50 },
    padding: 10,
  });

  return {
    width: Math.max(dimensions.width + 20, 50),
    height: Math.max(dimensions.height + 20, 30),
  };
}
```

### 多行文本

```javascript
const textElement = textUtil.createText("Line 1\nLine 2\nLine 3", {
  box: { width: 100, height: 100 },
  align: "left-top",
  padding: 5,
});
```

## 内部实现

### 文本测量

使用隐藏的 SVG 元素进行文本测量：

1. 创建不可见的 `<svg>` 元素
2. 在其中创建 `<text>` 元素
3. 设置文本内容和样式
4. 使用 `getBBox()` 获取实际尺寸
5. 移除临时元素

### 换行算法

1. 按 `\n` 分割文本为多行
2. 对每一行检查宽度
3. 如果超出，尝试在空格或连字符处断行
4. 如果必要，强制断行

## 使用建议

1. **复用实例**: 为相同样式的文本创建通用 Text 实例
2. **设置合理的盒子大小**: 避免文本被过度截断
3. **考虑性能**: 大量文本渲染时，考虑使用缓存
4. **样式一致性**: 使用相同的字体和样式配置

## 相关模块

- `EscapeUtil`: 可配合使用转义HTML字符
- `LabelSupport`: 使用 Text 工具渲染标签
