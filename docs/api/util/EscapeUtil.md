# EscapeUtil

转义工具，提供 HTML 和 CSS 字符串转义功能。

## 模块说明

`EscapeUtil` 提供了用于转义 HTML 和 CSS 字符串的工具函数，防止 XSS 攻击和 CSS 注入。

## 模块依赖

此模块为纯工具函数模块，无外部依赖。

## 公共方法

### escapeHTML()

**作用**: 转义 HTML 特殊字符。

**参数**:

- `str` `{string}`: 要转义的字符串

**返回值**: `{string}` - 转义后的字符串

**说明**: 转义以下字符：

- `&` → `&amp;`
- `<` → `&lt;`
- `>` → `&gt;`
- `"` → `&quot;`
- `'` → `&#39;`

**示例**:

```javascript
import { escapeHTML } from "diagram-js/lib/util/EscapeUtil";

escapeHTML('<script>alert("XSS")</script>');
// '&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;'

escapeHTML("Tom & Jerry");
// 'Tom &amp; Jerry'
```

---

### escapeCSS()

**作用**: 转义 CSS 选择器字符串。

**参数**:

- `str` `{string}`: 要转义的字符串

**返回值**: `{string}` - 转义后的字符串

**说明**: 使用浏览器原生 `CSS.escape()` API。

**示例**:

```javascript
import { escapeCSS } from "diagram-js/lib/util/EscapeUtil";

escapeCSS("element#id"); // 'element\\#id'
escapeCSS(".class:hover"); // '\\.class\\:hover'
escapeCSS("my element"); // 'my\\ element'
```

## 使用建议

1. **始终转义用户输入**: 在将用户输入插入 HTML 或 CSS 前进行转义
2. **防止 XSS**: 使用 `escapeHTML()` 转义所有动态 HTML 内容
3. **CSS 选择器安全**: 使用 `escapeCSS()` 转义元素 ID 用作选择器时

## 典型用法

### 安全地显示用户输入

```javascript
import { escapeHTML } from "diagram-js/lib/util/EscapeUtil";

function renderElementLabel(element) {
  const labelText = escapeHTML(element.businessObject.name);
  return `<div class="label">${labelText}</div>`;
}
```

### 使用元素 ID 作为 CSS 选择器

```javascript
import { escapeCSS } from "diagram-js/lib/util/EscapeUtil";

function highlightElement(elementId) {
  const selector = "#" + escapeCSS(elementId);
  document.querySelector(selector).classList.add("highlight");
}
```

## 相关模块

- `Text`: 提供文本渲染功能，内部可能使用转义
