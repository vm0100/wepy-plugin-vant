import { existsSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import copydir from "copy-dir";

const VANT_PATH = eval("require.resolve('vant-weapp/package.json').replace(/package.json$/, '')");
const VANT_VERISON = eval("require('vant-weapp/package.json').version");

import { VANT_SOURCE_DIR, VERSION_FILE_NAME } from "./config";

// 复制Vant的文件到src中
const copyVantToSrc = (componentsDir) => {
  const sourcePath = join(VANT_PATH, VANT_SOURCE_DIR);
  const targetPath = join("src", "components", componentsDir);
  const versionPath = join("src", "components", componentsDir, VERSION_FILE_NAME);

  // 检测src目录下的副本
  if (existsSync(targetPath) && existsSync(versionPath)) {
    const copyVersion = readFileSync(versionPath, "utf-8");
    if (copyVersion === VANT_VERISON) return; // 比对版本
  }
  copydir.sync(sourcePath, targetPath); // 复制文件夹
  writeFileSync(versionPath, VANT_VERISON); // 添加版本文件
  addCopyFolderToGitIgnore(componentsDir); // 把复制过去的文件夹添加.gitignore
};

// 添加git忽略
const addCopyFolderToGitIgnore = (componentsDir) => {
  if (!existsSync(".gitignore")) {
    writeFileSync(".gitignore", "src/components/" + componentsDir + "/");
  } else {
    let ignore = readFileSync(".gitignore", "utf-8");
    if (!ignore.match("src/components/" + componentsDir)) {
      ignore += "\nsrc/components/" + componentsDir + "/";
      writeFileSync(".gitignore", ignore);
    }
  }
};

export default copyVantToSrc;
