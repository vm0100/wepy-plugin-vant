const getPageFilter = (pagePath, fileType) => {
  const pagePaths = typeof pagePath === "string" ? [pagePath] : pagePath;
  const regs = [];
  pagePaths.forEach(path => {
    regs.push(path + '([\\/]|[\\\\]).*' + fileType + '$')  // eslint-disable-line
  });
  return new RegExp(regs.join("|"));
};

const getVantFilter = (fileType, targetPath) => {
  return new RegExp(`${targetPath}([\\/]|[\\\\]).*\\.${fileType}$`);
};

// page filter
const getPageConfigFilter = (pagePath) => getPageFilter(pagePath, "json");

// wxss filter
const getWxssFilter = (pagePath) => getPageFilter(pagePath, "wxss");

// vant filter
const getVantWxssFilter = (componentsDir) => getVantFilter("wxss", componentsDir);
const getVantWxmlFilter = (componentsDir) => getVantFilter("wxml", componentsDir);

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
  getPixelUnitMultiple,
  getWxssFilter
};

export default {
  getVantWxssFilter,
  getPageConfigFilter,
  getVantWxmlFilter,
  getPixelUnitMultiple,
  getWxssFilter
};