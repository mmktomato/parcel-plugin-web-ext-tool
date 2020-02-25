const webExt = require("web-ext").default;
const process = require("process");
const path = require("path");
const fsPromise = require("fs").promises;

let runner = null;

const getConfig = async () => {
  // TODO: ~/.web-ext-config.js
  // TODO: path.resolve(process.cwd(), "web-ext-config.js")

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

module.exports = bundler => {
  if (!bundler.options.watch) {
    return;
  };

  bundler.on("bundled", async (bundle) => {
    if (runner) {
      runner.reloadAllExtensions();
      return;
    }

    let config = await getConfig() || {};
    if (!config.noReload) {
      config.noReload = true;
    }
    if (!config.sourceDir) {
      config.sourceDir = process.cwd();
    }

    runner = await webExt.cmd.run(config, {
      shouldExitProgram: true,
    });

    runner.registerCleanup(() => {
      runner = null;
    });
  });
};
