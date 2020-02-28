# parcel-plugin-web-ext-tool
A parcel plugin for web-ext. This plugin integrates [Parcel](https://parceljs.org/) and [web-ext](https://github.com/mozilla/web-ext).

If you run `parcel watch` or `parcel serve`, the plugin runs `web-ext run` within it. If you modify your extension code, Parcel detects it and rebuilds, then web-ext detects it and reloads your extension.

# Install
Install via npm. In addtion, you need to install `parcel-bundler` and `web-ext` by yourself.

```
$ npm install --save-dev parcel-bundler web-ext parcel-plugin-web-ext-tool
```

# Usage
Run `parcel watch` or `parcel serve` in any way you like.

## Config
You can specify web-ext's settings via config files. The plugin reads config files in the following order. The same option is overwritten by the latter one.

* ~/.web-ext-config.js
* package.json
* web-ext-config.js

See [web-ext's official doc](https://extensionworkshop.com/documentation/develop/getting-started-with-web-ext/#automatic-discovery-of-configuration-files) for details.
