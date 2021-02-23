# Release Procedure

* `git switch master && git pull`
* `npm version [major|minor|patch]`
    * This generates a new tag.
* `git push origin master`
* `git push origin [version]`
* `npm login`
* `npm publish --dry-run`
* `npm publish`
* `npm logout`
* Create a release in Github.
    * Push `Draft a new release` button in https://github.com/mmktomato/parcel-plugin-web-ext-tool/releases
