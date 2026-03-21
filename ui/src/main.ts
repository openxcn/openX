import "./styles.css";
import { initI18n, registerTranslations } from "./ui/i18n/index.js";
import { zhCN } from "./ui/i18n/zh-CN.js";
import { en } from "./ui/i18n/en.js";

registerTranslations("zh-CN", zhCN);
registerTranslations("en", en);
initI18n();

import "./ui/app.ts";
