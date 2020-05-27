# How to build Proximity Tracing

## Install missing packages

The build-Process is crafted around `gulp`, a `Node.js`
deployment-tool. To ensure that all packages are installed,
run

```bash
npm update
```

in the `proximitytracing` directory.

## Build the system

Afterwards a call of

```bash
gulp
```

in the same directory should trigger the build process.

## The `dist` directory

In the `dist` directory you find the following directories and a bunch of JavaScript-Packages:

* `dp3t` contains the CTO app for the DP-3T protocol demonstration,
* `exposurenotification` contains the CTO app for the "Exposure Notification" protocol (Apple/Google),
* `locales` contains localization files copied to this canonical location from the source tree

You can completly remove the `dist` directory (and it is not part of the repository) and recreate its contents with another invocation of `gulp`.

The algorithm directories contain:

* a configuration file for Joomla,
* HTML fragments for each localized language used by Joomla,
* JavaScript files for each localized language,
* a CSS file,
* Web pages for each localized language to try out locally in a browser.

## The `node_modules` directory

The `node_modules` directory is populated by `npm` with all `Node.js` modules needed. The file `pakage.json` contains a list of needed dependencies.

## The `src` directory

The `src` directory contains one directory for each tracing protocol and a directory with common files (`common`).

Each protocol directory contains its own set of files that heavily includes base templates from the `common` directory.
The whole UI logic (which is the same for all protocol demonstrations) resides in the `common` directory.
Placeholders and algorithm objects are injected by the code of the protocol implementation.

To see how this is transformed into the final pages, please inspect the `gulpfile.js` file.
