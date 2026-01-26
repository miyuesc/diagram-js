# EditorActions

编辑器操作，提供常用编辑操作的统一API。

## 模块说明

`EditorActions` 提供撤销、重做、复制、粘贴等常用编辑操作的统一接口。

## 模块依赖

```javascript
EditorActions.$inject = ["eventBus", "commandStack", "selection", "modeling"];
```

## 主要API

### trigger(action, options)

触发编辑器操作。

## 支持的操作

- `undo`: 撤销
- `redo`: 重做
- `copy`: 复制
- `paste`: 粘贴
- `removeSelection`: 删除选中元素
- `selectAll`: 全选
- `zoom`: 缩放
- `stepZoom`: 步进缩放
- `fit-viewport`: 适应视口

## 使用示例

```javascript
const editorActions = diagram.get("editorActions");

// 撤销
editorActions.trigger("undo");

// 重做
editorActions.trigger("redo");

// 删除选中
editorActions.trigger("removeSelection");

// 缩放
editorActions.trigger("zoom", { value: 1.5 });

// 适应视口
editorActions.trigger("fit-viewport");
```

## 注册自定义操作

```javascript
editorActions.register({
  saveModel: function() {
    // 保存模型逻辑
    const xml = await modeler.saveXML();
    downloadXML(xml);
  }
});

// 触发自定义操作
editorActions.trigger('saveModel');
```

## 相关模块

- `Keyboard`: 绑定快捷键到编辑器操作
- `CommandStack`: 撤销/重做
- `CopyPaste`: 复制粘贴
