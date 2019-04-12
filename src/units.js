import { TARGET_DIR_NAME } from "./config";

const getPageFilter = (pagePath, fileType) => {
  const pagePaths = typeof pagePath === "string" ? [pagePath] : pagePath;
  const regs = [];
  pagePaths.forEach(path => {
        regs.push(path + '([\\/]|[\\\\]).*' + fileType + '$')  // eslint-disable-line
  });
  return new RegExp(regs.join("|"));
};

const getVantFilter = (fileType, targetPath = TARGET_DIR_NAME) => {
  return new RegExp(`${targetPath}([\\/]|[\\\\]).*\\.${fileType}$`);
};

// page filter
const getPageConfigFilter = (pagePath) => getPageFilter(pagePath, "json");

// vant filter
const getVantWxssFilter = () => getVantFilter("wxss");
const getVantWxmlFilter = () => getVantFilter("wxml");

const RPX_RELATIVE = 750;

const getPixelUnitMultiple = (unit, relative) => {
  var result = {
    rpx: RPX_RELATIVE / relative,
    rem: 1 / relative,
    em: 1 / relative,
    px: 1 / relative
  };
  return result[unit] || 1;
};

export {
  getVantWxssFilter,
  getPageConfigFilter,
  getVantWxmlFilter,
  getPixelUnitMultiple
};

export default {
  getVantWxssFilter,
  getPageConfigFilter,
  getVantWxmlFilter,
  getPixelUnitMultiple
}
;