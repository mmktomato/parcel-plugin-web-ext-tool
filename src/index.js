const webExt = require("web-ext");
const { getConfig } = require("./config");

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

    const config = await getConfig();

    runner = await webExt.cmd.run(config, {
      shouldExitProgram: true,
    });

    runner.registerCleanup(() => {
      runner = null;
    });
  });
};
