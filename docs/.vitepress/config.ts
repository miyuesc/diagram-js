import { defineConfig } from "vitepress";
import { withMermaid } from "vitepress-plugin-mermaid";

export default withMermaid(
  defineConfig({
    lang: "zh-CN",
    title: "diagram-js 中文文档",
    description: "diagram-js 中文文档 - 用于在 Web 上显示和修改图表的工具箱",

    // Mermaid 配置
    mermaid: {
      // 可选：自定义 mermaid 配置
    },
    mermaidPlugin: {
      class: "mermaid my-class", // 为 mermaid 容器设置额外的 CSS 类
    },

    themeConfig: {
      logo: "/logo.svg",

      nav: [
        { text: "首页", link: "/" },
        { text: "快速开始", link: "/guide/introduction" },
        { text: "核心原理", link: "/guide/architecture" },
        { text: "API 文档", link: "/api/model/" },
      ],

      sidebar: {
        "/guide/": [
          {
            text: "指南",
            items: [
              { text: "介绍", link: "/guide/introduction" },
              { text: "核心架构", link: "/guide/architecture" },
              { text: "模块依赖", link: "/guide/modules" },
              { text: "扩展开发", link: "/guide/extensions" },
              { text: "工作流程", link: "/guide/workflow" },
            ],
          },
        ],
        "/api/": [
          {
            text: "Model 模块",
            collapsed: false,
            items: [{ text: "Model 工厂", link: "/api/model/" }],
          },
          {
            text: "Core 核心模块",
            collapsed: false,
            items: [
              { text: "Canvas", link: "/api/core/Canvas" },
              { text: "ElementFactory", link: "/api/core/ElementFactory" },
              { text: "ElementRegistry", link: "/api/core/ElementRegistry" },
              { text: "EventBus", link: "/api/core/EventBus" },
              { text: "GraphicsFactory", link: "/api/core/GraphicsFactory" },
            ],
          },
          {
            text: "Command 命令模块",
            collapsed: false,
            items: [
              { text: "CommandHandler", link: "/api/command/CommandHandler" },
              {
                text: "CommandInterceptor",
                link: "/api/command/CommandInterceptor",
              },
              { text: "CommandStack", link: "/api/command/CommandStack" },
            ],
          },
          {
            text: "Util 工具模块",
            collapsed: true,
            items: [
              { text: "AttachUtil", link: "/api/util/AttachUtil" },
              { text: "ClickTrap", link: "/api/util/ClickTrap" },
              { text: "Collections", link: "/api/util/Collections" },
              { text: "Cursor", link: "/api/util/Cursor" },
              { text: "Elements", link: "/api/util/Elements" },
              { text: "EscapeUtil", link: "/api/util/EscapeUtil" },
              { text: "Event", link: "/api/util/Event" },
              { text: "Geometry", link: "/api/util/Geometry" },
              { text: "GraphicsUtil", link: "/api/util/GraphicsUtil" },
              { text: "IdGenerator", link: "/api/util/IdGenerator" },
              { text: "LineIntersection", link: "/api/util/LineIntersection" },
              { text: "Math", link: "/api/util/Math" },
              { text: "ModelUtil", link: "/api/util/ModelUtil" },
              { text: "Mouse", link: "/api/util/Mouse" },
              { text: "Platform", link: "/api/util/Platform" },
              { text: "PositionUtil", link: "/api/util/PositionUtil" },
              { text: "Removal", link: "/api/util/Removal" },
              { text: "RenderUtil", link: "/api/util/RenderUtil" },
              { text: "SvgTransformUtil", link: "/api/util/SvgTransformUtil" },
              { text: "Text", link: "/api/util/Text" },
            ],
          },
          {
            text: "Features 功能特性",
            collapsed: true,
            items: [
              { text: "Selection", link: "/api/features/Selection" },
              { text: "Modeling", link: "/api/features/Modeling" },
              { text: "Move", link: "/api/features/Move" },
              { text: "Resize", link: "/api/features/Resize" },
              { text: "Connect", link: "/api/features/Connect" },
              { text: "Dragging", link: "/api/features/Dragging" },
              { text: "Create", link: "/api/features/Create" },
              { text: "Bendpoints", link: "/api/features/Bendpoints" },
              { text: "ContextPad", link: "/api/features/ContextPad" },
              { text: "Palette", link: "/api/features/Palette" },
              { text: "CopyPaste", link: "/api/features/CopyPaste" },
              { text: "Keyboard", link: "/api/features/Keyboard" },
              {
                text: "KeyboardMoveSelection",
                link: "/api/features/KeyboardMoveSelection",
              },
              { text: "HandTool", link: "/api/features/HandTool" },
              { text: "LassoTool", link: "/api/features/LassoTool" },
              { text: "SpaceTool", link: "/api/features/SpaceTool" },
              { text: "AlignElements", link: "/api/features/AlignElements" },
              {
                text: "DistributeElements",
                link: "/api/features/DistributeElements",
              },
              { text: "Overlays", link: "/api/features/Overlays" },
              { text: "Tooltips", link: "/api/features/Tooltips" },
              { text: "AutoPlace", link: "/api/features/AutoPlace" },
              { text: "AutoResize", link: "/api/features/AutoResize" },
              { text: "AutoScroll", link: "/api/features/AutoScroll" },
              { text: "AttachSupport", link: "/api/features/AttachSupport" },
              { text: "LabelSupport", link: "/api/features/LabelSupport" },
              { text: "Rules", link: "/api/features/Rules" },
              { text: "Ordering", link: "/api/features/Ordering" },
              { text: "Replace", link: "/api/features/Replace" },
              { text: "GlobalConnect", link: "/api/features/GlobalConnect" },
              { text: "Snapping", link: "/api/features/Snapping" },
              { text: "GridSnapping", link: "/api/features/GridSnapping" },
              { text: "PopupMenu", link: "/api/features/PopupMenu" },
              { text: "EditorActions", link: "/api/features/EditorActions" },
              { text: "ToolManager", link: "/api/features/ToolManager" },
              {
                text: "InteractionEvents",
                link: "/api/features/InteractionEvents",
              },
              {
                text: "ConnectionPreview",
                link: "/api/features/ConnectionPreview",
              },
              { text: "PreviewSupport", link: "/api/features/PreviewSupport" },
              { text: "ComplexPreview", link: "/api/features/ComplexPreview" },
              { text: "Outline", link: "/api/features/Outline" },
              { text: "Search", link: "/api/features/Search" },
              { text: "SearchPad", link: "/api/features/SearchPad" },
              { text: "ChangeSupport", link: "/api/features/ChangeSupport" },
              { text: "RootElements", link: "/api/features/RootElements" },
              { text: "Mouse", link: "/api/features/Mouse" },
              { text: "Scheduler", link: "/api/features/Scheduler" },
              { text: "HoverFix", link: "/api/features/HoverFix" },
              { text: "Clipboard", link: "/api/features/Clipboard" },
            ],
          },
          {
            text: "Navigation 导航模块",
            collapsed: true,
            items: [
              { text: "MoveCanvas", link: "/api/navigation/MoveCanvas" },
              { text: "ZoomScroll", link: "/api/navigation/ZoomScroll" },
              { text: "KeyboardMove", link: "/api/navigation/KeyboardMove" },
            ],
          },
          {
            text: "Layout 布局模块",
            collapsed: true,
            items: [
              { text: "BaseLayouter", link: "/api/layout/BaseLayouter" },
              {
                text: "ConnectionDocking",
                link: "/api/layout/ConnectionDocking",
              },
              {
                text: "CroppingConnectionDocking",
                link: "/api/layout/CroppingConnectionDocking",
              },
              { text: "LayoutUtil", link: "/api/layout/LayoutUtil" },
              { text: "ManhattanLayout", link: "/api/layout/ManhattanLayout" },
            ],
          },
          {
            text: "UI 用户界面",
            collapsed: true,
            items: [{ text: "UI", link: "/api/ui/UI" }],
          },
        ],
      },

      socialLinks: [
        { icon: "github", link: "https://github.com/bpmn-io/diagram-js" },
      ],

      footer: {
        message: "Released under the MIT License.",
        copyright: "Copyright © diagram-js contributors",
      },

      search: {
        provider: "local",
        options: {
          locales: {
            root: {
              translations: {
                button: {
                  buttonText: "搜索文档",
                  buttonAriaLabel: "搜索文档",
                },
                modal: {
                  noResultsText: "无法找到相关结果",
                  resetButtonTitle: "清除查询条件",
                  footer: {
                    selectText: "选择",
                    navigateText: "切换",
                  },
                },
              },
            },
          },
        },
      },

      outline: {
        label: "页面导航",
        level: [2, 3],
      },

      docFooter: {
        prev: "上一页",
        next: "下一页",
      },

      lastUpdated: {
        text: "最后更新于",
        formatOptions: {
          dateStyle: "short",
          timeStyle: "short",
        },
      },
    },
  }),
);
