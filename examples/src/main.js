import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import LWUI from "../../packages";
import "@lw-ui/theme/src/index.scss";

const app = createApp(App);

app.use(LWUI);
app.mount("#app");
