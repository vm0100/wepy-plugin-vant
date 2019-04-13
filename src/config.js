// config
export const VANT_SOURCE_DIR = "dist";
export const TARGET_DIR_NAME = "vant-weapp";
export const VERSION_FILE_NAME = ".version";

export const COMPONENT_IGNORE = {
  "common": true,
  "mixins": true,
  "wxs": true
};
export const DEFAULT_CONFIG = {
  pagePath: "pages",
  config: {
    inject: true,
    prefix: "van",
    px2: {
      isVantOnly: false,
      relative: 400,
      decimalPlaces: 2,
      comment: "no",
      targetUnits: "rpx"
    }
  }
};

