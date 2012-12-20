# GruntStart
A Grunt-enabled head-start with the H5BP, jQuery, Modernizr, and Respond. The builing blocks to quickly get started with [Grunt](http://gruntjs.com/) to create an optimized website.

Lint, minify and concatentate CSS and Javascript and provide simple lossless image compression throughout a project build.

* * *
#### Created by [Tim Svensen](http://timsvensen.com) (follow [@tsvensen](https://twitter.com/tsvensen))
* * *

## What
* [CSS](https://npmjs.org/package/grunt-css) Grunt plugin to lint and minify CSS
* [Smush-It](https://npmjs.org/package/grunt-smushit) Grunt plugin for losslessly compressing PNGs and JPGs
* HTML5 Boilerplate ([H5BP](http://html5boilerplate.com/)) base CSS with normalize and inspired HTML index page
* <code>box-sizing: border-box;</code> for all elements
* Ready to use starter Grunt configuration file


## Quick Start
1. Clone or [download](https://github.com/tsvensen/gruntstart/archive/master.zip) <strong>Grunt</strong>Start
2. Run <code>grunt watch</code> from the command line within the project directory
3. Build your project
5. Keep tabs on the watch task output as custom CSS and Javascript files are saved
6. When going to production make sure to use the custom Modernizr build, only testing for exactly what you need. See /js/vendor/

Take a closer look at index.html to
* optionally use the non-minified CSS and Javascript for development
* optionally use Modernizr without Respond.js


## Usage
By default <strong>Grunt</strong>Start will lint, concatenate and minify your CSS and Javascript.

It is assumed [Nodejs](http://nodejs.org/) and [Grunt](http://gruntjs.com/) are installed.

### CSS
<strong>Grunt</strong>Start will lint all CSS within /custom/ then concatenate those into /libs/. The /libs/ directory is then concatenated and minified into /min/ for production use.

<strong>Grunt</strong>Start is setup by default to grab all the files within /custom/ and /libs/, so no changes to the Grunt setup are needed by adding new files.

* /css/custom/ : your custom CSS files (recommended to only modify existing styles in _h5bp.css)
* /css/libs/ : add CSS provided by plugins or libraries here
* /css/min/ : the concatenated and minified CSS from /custom/ and /libs/

### Javascript
<strong>Grunt</strong>Start will lint all Javascript within /custom/ then concatenate those into /libs/. The /libs/ directory is then concatenated and minified into /min/ for production use.

* /js/custom/ : your custom Javascript files
* /js/libs/ : add non-minified Javascript plugins or libraries here
* /js/min/ : the concatenated and minified Javascript from /custom/ and /libs/
* /js/vendor/ : already minified Javascript not be concatenated and minified

For example, jQuery lives within /vendor/ so it's only loaded once and only loaded if the Google CDN fails. Modernizr also lives in here as it needs to be added in the document HEAD.

### Tasks
<strong>Grunt</strong>Start comes with the following [tasks](https://github.com/gruntjs/grunt/blob/0.3-stable/docs/getting_started.md#tasks-and-helpers), ran from the command line:

* <code>grunt</code> or <code>grunt default</code> will lint, concat and minify both CSS and JS by default.
* <code>grunt minify</code> will run the default task above and compress images with Yahoo! [SmushIt](http://www.smushit.com/ysmush.it/).
* <code>grunt watch</code> is not a custom task, but inteded to run while developing to see live linting and minification results.

Grunt watch is truly where the power of Grunt shines as the default task is ran after each watched file is changed. See the quick tutorial below to learn more.

#### Understanding The Watch Task
1. Open up a command line instance and navigate to the project directory where Grunt is set up.
2. Run <code>grunt</code> or <code>grunt default</code>, note the output.
3. Run <code>grunt watch</code> from the command line. Grunt is now running the watch task and waiting.
4. Open /css/custom/style.css or /js/custom/scripts.js in your favorite code editor and save the file.
5. Go back to the command line where watch is running and note the output, the same as running the default task.
6. Success! The default task is ran everytime a watched file is changed.


## GruntStart Architecture Decisions and Advanced Usage
<strong>Grunt</strong>Start utilizes a flat directory structure within /js/ and /css/ to solve pathing issues for media that arise in CSS or Javascript development. The multiple directories within /css/ and /js/ allow flexibility for a wide range of development approaches.

The /css/libs/ and /js/libs/ directories have a z.style.concat.js and z.scripts.concat.js. These are the files concatenated from /custom/ by <strong>Grunt</strong>Start. The 'z' prefix is there to make sure the custom code is included after any plugin or library code. Again this provides flexibility and solves a few problems, one of which is ordering what code comes first.

In the future a custom Grunt task could solve this problem. Until then, to gain further control of file order you will have to re-work the grunt.js configuration specifically to your project.


## Project Goal and Future
Provide a quick and easy solution for developers to lint and minify their code. The goal is to branch and extend this base setup for other starter projects such as Twitter Bootstrap, Foundation and more. Feel free to contribute, Pull Requests will be accepted for improvements to the base setup and framework specific branches.

Remember, this is a start. From here you can mold and shape it to fit your approach.


## Learn Grunt
Checkout the [Grunt Documentation](https://github.com/gruntjs/grunt#grunt-) and Merrick Christensen's [Grunt workflow article](http://merrickchristensen.com/articles/gruntjs-workflow.html) for a great grunt primer.


## Legal
Author & copyright (c) 2012: [Tim Svensen](http://timsvensen.com), Dual MIT & GPL license

### Grunt Legal
Copyright (c) 2012 "Cowboy" Ben Alman, contributors Licensed under the MIT license.

https://github.com/gruntjs/grunt/blob/master/LICENSE-MIT

### Grunt Plugins Legal
* CSS: Copyright (c) 2012 Jörn Zaefferer Licensed under the MIT license.
* Smush-it: MIT License (c) Helder Santana : based on: grunt-recess
