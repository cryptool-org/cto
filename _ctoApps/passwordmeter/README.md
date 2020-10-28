## How to build:

#### Dependencies:
* Node.js (with npm)

#### Step 1: Clone this project
```
$ git clone https://github.com/z11labs/cto-passwordmeter.git
```

#### Step 2: Install plugin-dependencies
```
$ cd ./cto-passwordmeter
$ npm install
```

#### Step 3: Install gulp.js
```
$ npm install --global gulp-cli
```
> **Notice:** Maybe you will need root-privileges for this

#### Step 4: Build the plugin
```
$ gulp
```

#### Step 5: View in browser
After building the plugin, you will see a new folder named `dist`, which contains all the output-files. 
In the subfolder `dist/passwordmeter` you will find two files named `web-*.html`, where `*` stands for the language-suffix. 
Choose the language you like and then just open it in your browser, to view the full plugin. Default is english (suffix: `en`).