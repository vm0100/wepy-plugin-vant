import { readdirSync } from "fs";
import { join, resolve, relative, dirname, basename } from "path";
import { VERSION_FILE_NAME, COMPONENT_IGNORE } from "./config";

import { getPageConfigFilter } from "./units";
import { normalize } from "upath";

// 获取需要注入的组件
const getInjectComponents = (globalConfig, pageConfig, componentsDir) => {
  const targetPath = join("src", "components", componentsDir);
  const components = readdirSync(targetPath).filter(component => (!COMPONENT_IGNORE[component] && component != VERSION_FILE_NAME));

  let globalInject = globalConfig.inject ? components : [];
  if (typeof globalConfig.inject !== "boolean" && globalConfig.inject instanceof Array) {
    globalInject = globalConfig.inject;
  }

  let vantConfig;
  if (pageConfig.hasOwnProperty("vant")) {
    vantConfig = pageConfig.vant;
    delete pageConfig.vant;
  }
  return [...new Set(globalInject.concat(vantConfig))].filter(component => component);
};

const injectComponents = (op, setting, componentsDir) => {
  const filter = getPageConfigFilter(setting.pagePath);
  if (filter.test(op.file) && op.type === "config") {
    const globalConfig = setting.config;
    const pageConfig = JSON.parse(op.code);

    // 将组件注入到json的usingComponents中
    const injectComponents = getInjectComponents(globalConfig, pageConfig, componentsDir); // 获取要注入的组件
    const relativePath = relative(dirname(op.file), resolve("dist/")); // 获取相对的路径
    pageConfig.usingComponents = pageConfig.usingComponents || {};
    injectComponents.forEach(component => {
      pageConfig.usingComponents[globalConfig.prefix + component] = normalize(relativePath) + "/components/" + componentsDir + "/" + component + "/index";
    });

    op.code = JSON.stringify(pageConfig); // 更新文件内容
    op.output && op.output({
      action: "变更",
      file: op.file
    });
  }
  return op;
};

export default injectComponents;
