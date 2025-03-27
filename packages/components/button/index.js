import { componentsInstall } from "@lw-ui/utils";
import Button from "./src/index.vue";

// 提供按需加载的方式
export const LWButton = componentsInstall(Button);
// 将组件导出
export default LWButton;
