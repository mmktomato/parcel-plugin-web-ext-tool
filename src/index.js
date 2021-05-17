const webExt = require("web-ext");
const { getConfig } = require("./config");
const { Reporter } = require("@parcel/plugin");

let watching = false;
let running = false;

module.exports = new Reporter({
  async report(opts) {
    let runner = null;

    if(opts.event.type === "watchStart") {
      watching = true;
    }

    if(watching && !running && opts.event.type === "buildSuccess") {
      running = true;
      const config = await getConfig();

      runner = await webExt.cmd.run(config, {
        shouldExitProgram: true
      })

      runner.registerCleanup(() => {
        runner = null;
      })
    }
  }
})
