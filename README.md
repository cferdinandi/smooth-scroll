# Smooth Scroll [![Build Status](https://travis-ci.org/cferdinandi/smooth-scroll.svg)](https://travis-ci.org/cferdinandi/smooth-scroll)
A lightweight script to animate scrolling to anchor links. Smooth Scroll works great with [Gumshoe](https://github.com/cferdinandi/gumshoe).

[Download Smooth Scroll](https://github.com/cferdinandi/smooth-scroll/archive/master.zip) / [View the demo](http://cferdinandi.github.io/smooth-scroll/)

**In This Documentation**

1. [Getting Started](#getting-started)
2. [Installing with Package Managers](#installing-with-package-managers)
3. [Working with the Source Files](#working-with-the-source-files)
4. [Options & Settings](#options-and-settings)
5. [Browser Compatibility](#browser-compatibility)
6. [Known Issues](#known-issues)
7. [Contributors](#contributors)
8. [How to Contribute](#how-to-contribute)
9. [License](#license)
10. [Changelog](#changelog)
11. [Older Docs](#older-docs)



## Getting Started

Compiled and production-ready code can be found in the `dist` directory. The `src` directory contains development code. Unit tests are located in the `test` directory.

### 1. Include Smooth Scroll on your site.

```html
<script src="dist/js/smooth-scroll.js"></script>
```

### 2. Add the markup to your HTML.

```html
<a data-scroll href="#bazinga">Anchor Link</a>
...
<span id="bazinga">Bazinga!</span>
```

Turn anchor links into Smooth Scroll links by adding the `[data-scroll]` data attribute. Give the anchor location an ID just like you normally would.

### 3. Initialize Smooth Scroll.

```html
<script>
	smoothScroll.init();
</script>
```

In the footer of your page, after the content, initialize Smooth Scroll. And that's it, you're done. Nice work!



## Installing with Package Managers

You can install Smooth Scroll with your favorite package manager.

* **[NPM](https://www.npmjs.org/):** `npm install cferdinandi/smooth-scroll`
* **[Bower](http://bower.io/):** `bower install https://github.com/cferdinandi/smooth-scroll.git`
* **[Component](http://component.io/):** `component install cferdinandi/smooth-scroll`



## Working with the Source Files

If you would prefer, you can work with the development code in the `src` directory using the included [Gulp build system](http://gulpjs.com/). This compiles, lints, and minifies code, and runs unit tests. It's the same build system that's used by [Kraken](http://cferdinandi.github.io/kraken/), so it includes some unnecessary tasks and Sass variables but can be dropped right in to the boilerplate without any configuration.

### Dependencies
Make sure these are installed first.

* [Node.js](http://nodejs.org)
* [Ruby Sass](http://sass-lang.com/install)
* [Gulp](http://gulpjs.com) `sudo npm install -g gulp`

### Quick Start

1. In bash/terminal/command line, `cd` into your project directory.
2. Run `npm install` to install required files.
3. When it's done installing, run one of the task runners to get going:
	* `gulp` manually compiles files.
	* `gulp watch` automatically compiles files when changes are made.
	* `gulp reload` automatically compiles files and applies changes using [LiveReload](http://livereload.com/).



## Options and Settings

Smooth Scroll includes smart defaults and works right out of the box. But if you want to customize things, it also has a robust API that provides multiple ways for you to adjust the default options and settings.

### Global Settings

You can pass options and callbacks into Smooth Scroll through the `init()` function:

```javascript
smoothScroll.init({
	speed: 500, // Integer. How fast to complete the scroll in milliseconds
	easing: 'easeInOutCubic', // Easing pattern to use
	updateURL: true, // Boolean. Whether or not to update the URL with the anchor hash on scroll
	offset: 0, // Integer. How far to offset the scrolling anchor location in pixels
	callbackBefore: function ( toggle, anchor ) {}, // Function to run before scrolling
	callbackAfter: function ( toggle, anchor ) {} // Function to run after scrolling
});
```

#### Easing Options

**Linear**
*Moves at the same speed from start to finish.*

* `Linear`


**Ease-In**
*Gradually increases in speed.*

* `easeInQuad`
* `easeInCubic`
* `easeInQuart`
* `easeInQuint`


**Ease-In-Out**
*Gradually increases in speed, peaks, and then gradually slows down.*

* `easeInOutQuad`
* `easeInOutCubic`
* `easeInOutQuart`
* `easeInOutQuint`


**Ease-Out**
*Gradually decreases in speed.*

* `easeOutQuad`
* `easeOutCubic`
* `easeOutQuart`
* `easeOutQuint`


Learn more about the different easing patterns and what they do at [easings.net](http://easings.net/).

### Override settings with data attributes

Smooth Scroll also lets you override global settings on a link-by-link basis using the `[data-options]` data attribute:

```html
<a data-scroll
   data-options='{
                	"speed": 500,
                	"easing": "easeInOutCubic",
                	"offset": 0,
                	"updateURL": false
                }'
>
	Anchor Link
</a>
```

**Note:** You must use [valid JSON](http://jsonlint.com/) in order for the `data-options` feature to work.

### Use Smooth Scroll events in your own scripts

You can also call Smooth Scroll's scroll animation events in your own scripts.

#### animateScroll()
Animate scrolling to an anchor.

```javascript
smoothScroll.animateScroll(
	toggle, // Node that toggles the animation. ex. document.querySelector('#toggle')
	anchor, // ID of the anchor to scroll to. ex. '#bazinga'
	options // Classes and callbacks. Same options as those passed into the init() function.
);
```

**Example 1**

```javascript
smoothScroll.animateScroll( null, '#bazinga' );
```

**Example 2**

```javascript
var toggle = document.querySelector('#toggle');
var options = { speed: 1000, easing: 'easeOutCubic' };
smoothScroll.animateScroll( toggle, '#bazinga', options );
```

#### destroy()
Destroy the current `smoothScroll.init()`. This is called automatically during the `init` function to remove any existing initializations.

```javascript
smoothScroll.destroy();
```


### Fixed Headers

Add a `[data-scroll-header]` data attribute to fixed headers. Smooth Scroll will automatically offset scroll distances by the header height. If you have multiple fixed headers, add `[data-scroll-header]` to the last one in the markup.

```html
<nav data-scroll-header>
	...
</nav>
```


## Browser Compatibility

Smooth Scroll works in all modern browsers, and IE 9 and above.

Smooth Scroll is built with modern JavaScript APIs, and uses progressive enhancement. If the JavaScript file fails to load, or if your site is viewed on older and less capable browsers, anchor links will jump the way they normally would. If you need to smooth scrolling for older browsers, [download the jQuery version of Smooth Scroll on GitHub](https://github.com/cferdinandi/smooth-scroll/tree/archive-v1).



## Known Issues

If the `<body>` element has been assigned a height of `100%`, Smooth Scroll is unable to properly calculate page distances and will not scroll to the right location. The `<body>` element can have a fixed, non-percentage based height (ex. `500px`), or a height of `auto`.



## Contributors

* Easing support contributed by [Willem Liu](https://github.com/willemliu).
* Easing functions forked from [Gaëtan Renaudeau](https://gist.github.com/gre/1650294).
* URL history support contributed by [Robert Pate](https://github.com/robertpateii).
* Fixed header support contributed by [Arndt von Lucadou](https://github.com/a-v-l).
* Infinite loop bugs in iOS and Chrome (when zoomed) by [Alex Guzman](https://github.com/alexguzman).
* IE10 rounding error fixed by [Luke Siedle](https://github.com/luke-siedle).
* Enhanced callback functions by [Constant Meiring](https://github.com/constantm).
* Scroll-to-top bug for links at the bottom of the page by [Jonas Havers](https://github.com/JonasHavers).
* AMD support and numerous code improvements by [Todd Motto](https://github.com/toddmotto).
* Push State bug fix by [Yanick Witschi](https://github.com/Toflar).
* CommonJS module support by [Riku Rouvila](https://github.com/rikukissa).
* Query string fix when updating URL by [Qu Yatong](https://github.com/quyatong).
* Scroll to top support by [Robbert Broersma](https://github.com/robbert).
* Unit tests by [Thibaud Colas](https://github.com/ThibWeb).



## How to Contribute

In lieu of a formal style guide, take care to maintain the existing coding style. Don't forget to update the version number, the changelog (in the `readme.md` file), and when applicable, the documentation.



## License
Smooth Scroll is licensed under the [MIT License](http://gomakethings.com/mit/).



## Changelog

Smooth Scroll uses [semantic versioning](http://semver.org/).

* v5.3.3 - December 21, 2014
	* Adjust how fixed header is set for better accuracy and flexibility.
* v5.3.2 - December 20, 2014
	* Added method to get node height more accurately.
* v5.3.1 - December 20, 2014
	* Cache header height for better performance.
* v5.3.0 - December 20, 2014
	* Now supports scrolling to the top with an empty hash (#).
* v5.2.2 - December 13, 2014
	* Updating URL now accounts for query strings.
* v5.2.1 - December 13, 2014
	* Added unit tests.
* v5.2.0 - November 21, 2014
	* Add focus to scrolled to anchor if focusable.
* v5.1.4 - October 18, 2014
	* Removed `.bind` dependency and polyfill.
	* Updated `gulpfile.js` tasks and namespacing.
* v5.1.3 - September 29, 2014
	* Fixed CommonJS module bug.
* v5.1.2 - August 31, 2014
	* Fixed event listener filter to account for sub elements.
	* Removed unused `event` argument from `animateScroll`
* v5.1.1 - August 21, 2014
	* Passed in `event` variable to `eventHandler` method, fixing Firefox bug.
* v5.1.0 - August 18, 2014
	* Added `destroy` method.
	* Converted to event bubbling approach for better performance.
	* Switched to Ruby Sass.
* v5.0.4 - August 15, 2014
	* Added fix for UMD structure.
* v5.0.3 - August 13, 2014
	* Replaced character escaping method with [`CSS.escape`](https://github.com/mathiasbynens/CSS.escape) for more robust character escaping.
* v5.0.2 - August 12, 2014
	* Added character escaping when first character in anchor ID is a number.
* v5.0.1 - August 8, 2014
	* Added polyfill for `Functions.prototype.bind`.
	* Removed Sass paths from `gulpfile.js`.
* v5.0.0 - July 21, 2014
	* Updated `data-options` functionality to JSON.
	* Fixed update URL bug.
	* Set update URL to `true` by default.
* v4.8.2 - June 28, 2014
	* Fixed `extend()` method.
* v4.8.1 - June 27, 2014
	* Fixed problem with `toggles` containing a URL before the fragment identifier
* v4.8.0 - June 21, 2014
	* Converted to gulp.js workflow.
	* Added unit testing.
	* Added minified versions of files.
* v4.7.2 - June 19, 2014
	* Fixed typo that broke scroll.
* v4.7.1 - June 19, 2014
	* Fixed factory/root/UMD definition.
* v4.7.0 - June 7, 2014
	* Added AMD support.
	* Moved public APIs to `exports` variable.
	* Improved feature test.
	* Replaced `Array.prototype.forEach` hack with proper `forEach` function.
	* Added a more well supported `trim` function.
	* General code optimizations for better minification and performance.
	* Updated to JSDoc documentation (sort of).
	* Updated to three number versioning system.
	* Added package manager installation info.
* v4.6 - March 21, 2014
	* [Fixed scroll-to-top bug for links at the bottom of the page](https://github.com/cferdinandi/smooth-scroll/issues/49).
* v4.5 - March 20, 2014
	* Added `offset` to `options`
* v4.4 - March 15, 2014
	* [Fixed iOS scroll-to-top bug](https://github.com/cferdinandi/smooth-scroll/issues/45).
* v4.3 - March 5, 2014
	* Added arguments to callback functions for greater versatility. [44](https://github.com/cferdinandi/smooth-scroll/pull/44)
* v4.2 - February 27, 2014
	* Fixed error for null `toggle` argument in `animateScroll` function ([43](https://github.com/cferdinandi/smooth-scroll/issues/43)).
* v4.1 - February 27, 2014
	* Converted `_defaults` to a literal object
* v4.0 - February 21, 2014
	* Better public/private method namespacing.
	* Require `init()` call to run.
	* New API exposes additional methods for use in your own scripts.
	* Better documentation.
* v3.3 - February 19, 2014
	* [Add `offsettTop` to `offsetHeigh`t for `scrollHeader`. Allows for multiple fixed headers, or a fixed header that sits slightly below the top of the page.](https://github.com/cferdinandi/smooth-scroll/pull/36)
* v3.2 - February 10, 2014
	* [Fixes iOS infinite loop](https://github.com/cferdinandi/smooth-scroll/pull/35) and [Chrome browser zoom](https://github.com/cferdinandi/smooth-scroll/issues/31) bugs.
* v3.1 - February 4, 2014
	* Reverted to `Array.protype.foreach` loops.
* v3.0 - January 28, 2014
	* Switched to a data attribute for the toggle selector.
	* Added namespacing to IIFE.
	* Updated looping method and event listener.
* v2.19 - January 23, 2014
	* [Fix back button behavior in Chrome.](https://github.com/cferdinandi/smooth-scroll/issues/26#issuecomment-33172325)
* v2.18 - January 23, 2014
	* [Update URL before animation.](https://github.com/cferdinandi/smooth-scroll/pull/27)
	* [Fix back button behavior in Firefox.](https://github.com/cferdinandi/smooth-scroll/issues/26)
* v2.17 - January 17, 2014
	* [Fixed back button behavior when using `data-url` feature.](https://github.com/cferdinandi/smooth-scroll/pull/18)
* v2.16 - January 16, 2014
	* [Updated variables for more accurate easing math when scrolling to top of page.](https://github.com/cferdinandi/smooth-scroll/pull/25#issuecomment-32566729)
* v2.15 - January 16, 2014
	* [Fixed bug that caused "scroll-to-top" animation to create endless loop.](https://github.com/cferdinandi/smooth-scroll/issues/24)
* v2.14 - January 15, 2014
	* [Fixed bug that caused animation to stop several pixels short.](https://github.com/cferdinandi/smooth-scroll/pull/15#issuecomment-32380770)
* v2.12 - January 7, 2014
	* [Added fixed header support.](https://github.com/cferdinandi/smooth-scroll/pull/20#issuecomment-31773547)
* v2.11 - January 4, 2014
	* [Change `offsetHeight` to `scrollHeight` to fix fixed/absolute positioning issues.](https://github.com/cferdinandi/smooth-scroll/pull/14)
* v2.10 - December 31, 2013
	* [Added URL history support.](https://github.com/cferdinandi/smooth-scroll/pull/17)
* v2.9 - December 9, 2013
	* [Added fixed for infinite loop when scrolling up.](https://github.com/cferdinandi/smooth-scroll/issues/13)
* v2.8 - December 3, 2013
	* [Fixed false distance reading.](https://github.com/cferdinandi/smooth-scroll/issues/11)
	* Added linear easing as fallback when easing pattern not recognized to prevent script from failing.
* v2.7 - November 25, 2013
	* Converted naming conventions back to mathmatical roots (ex. `easeInCubic`) to remain consistent with development community language.
* v2.6 - November 26, 2013
	* Missing character was causing certain easing functions to break.
* v2.5 - November 22, 2013
	* Changed the default easing to `easeInOutNormal`.
* v2.4 - November 21, 2013
	* Added easing support with contributions from [Willem Liu](https://github.com/willemliu) and code from [Gaëtan Renaudeau](https://gist.github.com/gre/1650294).
* v2.3 - August 27, 2013
	* Added missing semicolons.
	* Defined `animationStop` variable once, add values later.
	* Activated strict mode.
	* Wrapped in IIFE.
* v2.2 - August 17, 2013
	* Now you can set the animation speed with the `data-speed` attribute. (ex. `data-speed="400"`)
* v2.1 - August 17, 2013
	* Improvement animation function interval for smoother animation.
	* Updated to allow for scrolling up the page.
* v2.0 - August 14, 2013
	* Converted to vanilla JavaScript.
	* Removed dependency on jQuery.
* v1.1 - June 7, 2013
	* Switched to MIT license.
* v1.1 - May 18, 2013
	* Added jQuery noConflict mode.
	* Updated tutorial.
* v1.0 - January 24, 2013
	* Initial release.



## Older Docs

* [Version 3](http://cferdinandi.github.io/smooth-scroll/archive/v3/)
* [Version 1](https://github.com/cferdinandi/smooth-scroll/tree/archive-v1)