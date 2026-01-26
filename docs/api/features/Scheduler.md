# Scheduler

调度器，管理异步任务队列。

## 模块说明

`Scheduler` 管理和调度异步任务，确保任务按顺序执行。

## 模块依赖

```javascript
Scheduler.$inject = ["eventBus"];
```

## 主要API

### schedule(fn)

调度一个任务在下一个事件循环执行。

## 使用示例

```javascript
const scheduler = diagram.get("scheduler");

scheduler.schedule(function () {
  // 异步执行的任务
  console.log("任务执行");
});
```

## 相关模块

主要内部使用，确保渲染和更新的正确顺序。
