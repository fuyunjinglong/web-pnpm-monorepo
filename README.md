# vite pnpm monorepo-基建库-缺打包

## 安装 pnpm

> pnpm i

## **初始化项目**

新建项目名称 web-pnpm-monorepo-component

> - docs // 文档
> - components // 组件
> - examples// 样例

## **建立工作区**

根目录下新建 pnpm-workspace.yaml,内容是

```
packages:
  - "examples"
  - "packages/*"
  - "docs"
```

## **建立 UI 组件库包**

在 packages 目录里面新建三个文件夹：

- components ：存放组件的包
- utils：工具包
- hooks：钩子函数包

分别进入以上三个包中执行`pnpm init`命令初始化，并修改 packages.json 中 name 为*"name"*: "@lw-ui/components",以此类推

## **修改组件库调用方**

在根目录下 packages.json，新增以下内容，然后执行 pnpm i。安装完成后就可以在项目中使用这些包了

```
"devDependencies": {
    "@lw-ui/hooks": "workspace:*",
    "@lw-ui/components": "workspace:*",
    "@lw-ui/utils": "workspace:*"
  }
```

## **构建核心组件目录**

在 components 中创建一个 button，目录为

```
packages:
  - components:
      - button:
         -src:
           - style
           - index.vue
         - index.js
```

button/index.vue

```
<script setup>
defineOptions({
  name: "LWButton",
});
</script>

<template>
  <button>
    <span>
      <slot>button-lw</slot>
    </span>
  </button>
</template>
```

## **按需加载并导出组件**

在 utils 下新建 install.js

```
export const componentsInstall = (components) => {
  components.install = (app) => {
    app.component(components.name, components);
  };

  return components;
};
```

在 utils 下新建 index.js

```
export * from "./install";
```

这个函数其实就是接受一个组件，给组件添加 install 函数，这个 install 函数接收 app 对象，app 对象会调用 component 函数注册全局组件。

在 button/index.js 中增加如下代码：

```
import { componentsInstall } from "@lw-ui/utils";
import Button from "./src/index.vue";

// 提供按需加载的方式
export const LWButton = componentsInstall(Button);
// 将组件导出
export default LWButton;
```

在 components 文件里面新增一个 index.js ,作为组件库的入口文件

```
export * from "./button/index";
```

## 全局注册导出组件

在 packages 下面新建一个文件 components.js

```
import { LWButton } from "./components/button/index";
export default [LWButton];
```

在 packages 下面新建 index.js，代码如下：

```
// 按需 引入组件
export * from "./components/index";

import components from "./components";

export const install = (app) => {
  if (install.installed) return;
  console.log("install", components);
  components.forEach((component) => app.use(component));
};

export default install;
```

## **初始化演示库(example)**

在根目录下执行`npm create vite examples`，采用 vue+js,执行 npm i,npm run dev 启动项目

在 examples 中的 main.js 中引入，测试一下全局注册

```
import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import LWUI from "../../packages";

const app = createApp(App);
app.use(LWUI);
app.mount("#app");
```

在 App.vue 代码：

```
<template>
  <LWButton></LWButton>
</template>
```

## 组件开发阶段二-BEM

## 组件开发阶段二-button 开发
