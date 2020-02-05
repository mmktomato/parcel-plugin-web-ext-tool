const webExt = require("web-ext").default;
const process = require("process");

let runner = null;

module.exports = bundler => {
  if (!bundler.options.watch) {
    return;
  };

  bundler.on("bundled", async (bundle) => {
    if (runner) {
      runner.reloadAllExtensions();
      return;
    }

    runner = await webExt.cmd.run({
      noReload: true,
      sourceDir: process.cwd(),
    }, {
      shouldExitProgram: true,
    });

    runner.registerCleanup(() => {
      runner = null;
    });
  });
};
