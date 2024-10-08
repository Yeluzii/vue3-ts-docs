import { defineConfig } from "vitepress";

// https://vitepress.vuejs.org/config/app-configs
export default defineConfig({
  title: "Vue 3 + TypeScript 学习文档",
  description: "详细学习 Vue 3 和 TypeScript 的指南",
  themeConfig: {
    siteTitle: "前端学习",
    logo: "https://yeluzi08-bucket.oss-cn-nanjing.aliyuncs.com/img/logo.png",
    nav: [
      { text: "首页", link: "/" },
      { text: "指南", link: "/guide/" },
      { text: "Vue 3 基础", link: "/vue3-base/" },
      { text: "组件", link: "/components/" },
      { text: "API 参考", link: "/api/" },
      { text: "项目实践", link: "/projects/" },
      { text: "疑难解答", link: "/questions/" },
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/Yeluzii/vue3-ts-docs.git" },
    ],
    sidebar: {
      "/guide/": [
        {
          text: "开始",
          collapsible: true,
          items: [
            { text: "介绍", link: "/guide/" },
            { text: "环境准备", link: "/guide/environment" },
            { text: "快速安装", link: "/guide/installation" },
            { text: "基本概念", link: "/guide/concepts" },
          ],
        },
      ],
      "/components/": [
        {
          text: "常用组件",
          collapsible: true,
          items: [
            { text: "介绍", link: "/components/" },
            { text: "按钮 Button", link: "/components/button" },
            { text: "表单 Form", link: "/components/table" },
          ],
        },
      ],
      "/api/": [
        {
          text: "api学习",
          collapsible: true,
          items: [
            { text: "介绍", link: "/api/" },
            { text: "组合式函数 Composable", link: "/api/composable" },
            { text: "VueUse", link: "/api/vueuse" },
          ],
        },
      ],
      "/projects/": [
        {
          text: "项目实践",
          collapsible: true,
          items: [
            { text: "介绍", link: "/projects/" },
            { text: "Vue 3 外卖前端项目", link: "/projects/vue3-waimai" },
          ],
        },
      ],
    },
    footer: {
      message: "用心学习 Vue 3 和 TypeScript！",
      copyright: "Copyright © 2024 ychen",
    },
  },
});
