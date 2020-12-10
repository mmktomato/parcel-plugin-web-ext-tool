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

  return obj || null;
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

  return (obj && obj.webExt) ? obj.webExt : null;
};

const getUserHomeConfig = () => {
  const configPath = path.resolve(os.homedir(), ".web-ext-config.js");
  let obj = null;

  try {
    obj = require(configPath);
  } catch (e) {
    return null;
  }

  return obj || null;
};

const flatten = (config) => {
  // Merge global options and "run" options.
  // See "Global options" sections in https://extensionworkshop.com/documentation/develop/web-ext-command-reference/

  if (!config || Object.keys(config).length < 1) {
    return {};
  }

  // Intentionally omitted "help" and "version".
  const globalOptions = [
    "artifactsDir", "config", "configDiscovery", "noConfigDiscovery", "ignoreFiles", "noInput", "sourceDir", "verbose"
  ];

  const ret = { ...config.run };

  globalOptions.forEach(opt => {
    if (opt in config) {
      ret[opt] = config[opt];
    }
  });

  return ret;
};

const getConfig = async () => {
  const userHomeConfig = flatten(getUserHomeConfig());
  const packageJsonConfig = flatten(await getPackageJsonConfig());
  const cwdConfig = flatten(getCwdConfig());

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
