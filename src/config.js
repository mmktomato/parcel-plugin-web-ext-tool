const process = require("process");
const path = require("path");
const fsPromise = require("fs").promises;
const os = require("os");

// https://extensionworkshop.com/documentation/develop/getting-started-with-web-ext/#automatic-discovery-of-configuration-files

const getCwdConfig = () => {
  const configPath = path.resolve(process.cwd(), "web-ext-config.js");
  let obj = null;

  try {
    obj = require(configPath);
  } catch (e) {
    return null;
  }

  return (obj && obj.run) ? obj.run : null;
};

const getPackageJsonConfig = async () => {
  const packageJsonPath = path.resolve(process.cwd(), "package.json");
  let obj = null;

  try {
    const content = await fsPromise.readFile(packageJsonPath, { encoding: "utf8" });
    obj = JSON.parse(content);
  } catch (e) {
    return null;
  }

  return (obj && obj.webExt && obj.webExt.run) ? obj.webExt.run : null;
};

const getUserHomeConfig = () => {
  const configPath = path.resolve(os.homedir(), ".web-ext-config.js");
  let obj = null;

  try {
    obj = require(configPath);
  } catch (e) {
    return null;
  }

  return (obj && obj.run) ? obj.run : null;
};

const getConfig = async () => {
  const userHomeConfig = getUserHomeConfig() || {};
  const packageJsonConfig = await getPackageJsonConfig() || {};
  const cwdConfig = getCwdConfig() || {};

  let config = Object.assign(userHomeConfig, packageJsonConfig);
  config = Object.assign(config, cwdConfig);

  if (!config.noReload) {
    config.noReload = true;
  }
  if (!config.sourceDir) {
    config.sourceDir = process.cwd();
  }
  config.sourceDir = path.resolve(config.sourceDir);

  return config;
};

module.exports = { getConfig };
