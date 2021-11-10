## CrypTool-Online Plugin Repository

This repository contains the source code of all plugins included in [CrypTool-Online](https://cryptool-online.org) (CTO). CTO plugins are independent web applications, plugged-in to CTO.

The plugins reside in the folder `_ctoApps`. Some plugin folders contain multiple applications. There also is a [Template Plugin](https://github.com/ct-online/cto/tree/master/template) (including a guide) for developing new CTO plugins.


### Installing plugin dependencies

Most plugins are built using [Node.JS](https://nodejs.org/en/download), so install it (including NPM) on your device first. After you have installed it, navigate to a plugin's folder (e.g. `_ctoApps/ncid`) and run `npm install`:

```shell
$ cd _ctoApps/ncid
$ npm install
```

This installs all Node.JS depenencies the plugin needs.


### Building a CTO plugin

CTO only contains prebuilt plugin files. Therefore, any plugin in this repository has to be built before it can be ran locally or included in CTO. Most plugins are using `gulp` for building. Some other plugins use `webpack` or `browserify` or something like that.

> If the plugin folder contains a file named `gulpfile.js` it is built using `gulp`. If there is no such file, have a look into the file named `package.json`, maybe there is a run command or something.

Let's assume you want to build a plugin that contains a `gulpfile.js`. After installing the plugins dependencies, just run `gulp` inside of the plugin's folder (e.g. `_ctoApps/ncid`):

```shell
$ gulp
```

This should create a folder called `dist` or `build` which includes the prebuilt files. You can view them locally (some plugins generate a file called `web-en.html` for local viewing) or include them into CTO.


-----


### Error: 'primordials' not defined

If you get an error like this while building with `gulp`, it can be fixed by removing the `node_modules` folder, including a fixing file, and installing and building again:

```shell
$ rm -rf node_modules
$ wget https://raw.githubusercontent.com/ct-online/cto/f9779ddc0979179a9663d7fa339acb8e0a70ab96/npm-shrinkwrap.json
$ npm install
$ gulp
```

Now `gulp` should run fine.


-----

If you have any questions or feedback, please [send us a message](https://www.cryptool.org/en/contact?topic=cto) :)
