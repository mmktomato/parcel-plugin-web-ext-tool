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

# TODO
* web-ext's config files. -> https://github.com/mmktomato/parcel-plugin-web-ext-tool/issues/1
