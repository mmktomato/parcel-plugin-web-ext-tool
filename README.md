# parcel-plugin-web-ext-tool
A parcel plugin for web-ext. This plugin integrates [Parcel](https://parceljs.org/) and [web-ext](https://github.com/mozilla/web-ext).

If you run `parcel watch` or `parcel serve`, the plugin runs `web-ext run` within it. If you modify your application code, Parcel detects it and rebuild, then web-ext detects it and reloads your extension.

# Usage
Install via npm.

```
$ npm install --save-dev parcel-plugin-web-ext-tool
```

# TODO
* web-ext's config files. -> https://github.com/mmktomato/parcel-plugin-web-ext-tool/issues/1
