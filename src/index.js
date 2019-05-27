import merge from "deepmerge";
import copyVant from "./copy";
import injectComponents from "./inject";
import px2 from "./px2";
import { DEFAULT_CONFIG } from "./config";
import { extname } from "path";

export default class WepyPluginVant {
  constructor(c = {}) {
    c = merge(c, { isPx2On: c.config && c.config.px2 });
    if (c.isPx2On) {
      c = merge(c, { isVantOnly: c.config.isVantOnly });
    }
    this.setting = merge(DEFAULT_CONFIG, c);
    this.setting.uiDir = this.setting.ui + "-weapp";
    copyVant(this.setting.uiDir);
  }

  apply(op) {
    const setting = this.setting;
    const asyncApply = async () => {
      let ext = extname(op.file);
      if (setting.isPx2On && (ext === ".wxss" || ext === ".wxml")) {
        op = await px2(op, setting);
      }
      op = injectComponents(op, setting, setting.uiDir);
    };
    asyncApply().then(() => {
      op.next();
    })
  }
}
