# How to build the Vigenère Ciphers

## Install missing packages

The build-Process is crafted around `gulp`, a `Node.js`
deployment-tool. To ensure that all packages are installed,
run

```bash
npm update
```

in the `vigenere` directory.

## Build the system

Afterwards a call of

```bash
gulp
```

in the same directory should trigger the build process.

## The `dist` directory

In the `dist` directory you find the following directories and a bunch of JavaScript-Packages:

* `vigenere` contains the Vigenère encryption algorithm,
* `beaufort` contains a symetric variant of the Vigenère encryption algorithm,
* `gronsfeld` is a Vigenère encryption algorithm with different alphabets for message and key,
* `locales` contains localization files copied to this canonical location from the source tree,
* `test` contains test cases copied to this canonical localion from the source tree.

You can completly remove the `dist` directory (and it is not part of the repository) and recreate its contents with another invocation of `gulp`.

The algorithm directories contain:

* a configuration file for Joomla,
* HTML fragments for each localized language used by Joomla,
* JavaScript files for each localized language,
* a CSS file,
* Web pages for each localized language to try out locally in a browser.

## The `lib` directory

The `lib` directory contains the JavaScript libraries needed for running stand-alone (so no Internet connection is necessary while developing).
Currently it contains:

* jQuery,
* BootStrap.

## The `node_modules` directory

The `node_modules` directory is populated by `npm` with all `Node.js` modules needed. The file `pakage.json` contains a list of needed dependencies.

## The `src` directory

The `src` directory contains one directory for each encryption algorithm and a directory with common files (`common`) and test-related files (`test`).

Each encryption algorithm contains its own set of files that heavenly include base templates from the `common` directory.

To see, how this is transformed into the final pages, please inspect the `gulpfile.js` file.

