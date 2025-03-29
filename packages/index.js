// 按需 引入组件
export * from "./components/index";

import components from "./components";

export const install = (app) => {
  if (install.installed) return;
  console.log("install", components);
  components.forEach((component) => app.use(component));
};

export default install;
