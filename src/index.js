import merge from "deepmerge";
import copyVant from "./copy";
import injectComponents from "./inject";
import px2 from "./px2";
import { DEFAULT_CONFIG } from "./config";
import { extname } from "path";

// check vant is installed or not
try {
  eval("require('vant-weapp/package.json')");
} catch (e) {
  throw new Error("\n 未检测到: vant-weapp \n 您是否安装 vant-weapp ? \n 尝试 npm i -S https://github.com/TalkingData/vant-weapp.git");
}

export default class WepyPluginVant {
  constructor(c = {}) {
    copyVant(); // 拷贝Vant-weapp到src下
    c = merge(c, { isPx2On: c.config && c.config.px2 });
    this.setting = merge(DEFAULT_CONFIG, c);
  }

  apply(op) {
    const setting = this.setting;
    const asyncApply = async () => {
      let ext = extname(op.file);
      if (setting.isPx2On && (ext === ".wxss" || ext === ".wxml")) {
        op = await px2(op, setting);
      }
      op = injectComponents(op, setting);
    };
    asyncApply().then(() => {
      op.next();
    })
  }
}
