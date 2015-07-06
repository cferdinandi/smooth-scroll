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
7. [How to Contribute](#how-to-contribute)
8. [License](#license)



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
* [Gulp](http://gulpjs.com) `sudo npm install -g gulp`

### Quick Start

1. In bash/terminal/command line, `cd` into your project directory.
2. Run `npm install` to install required files.
3. When it's done installing, run one of the task runners to get going:
	* `gulp` manually compiles files.
	* `gulp watch` automatically compiles files when changes are made and applies changes using [LiveReload](http://livereload.com/).



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
	callback: function ( toggle, anchor ) {} // Function to run after scrolling
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

### Animating links to other pages

Smooth Scroll does not include an option to animate scrolling to links on other pages, but you can easily add this functionality using the API.

1. Do *not* add the `data-scroll` attribute to links to other pages. Treat them like normal links, and include your anchor link hash as normal.
	```markup
	<a href="some-page.html#example">
	```
2. Add the following script to the footer of your page, after the `smoothScroll.init()` function.
	```markup
	<script>
		if ( window.location.hash ) {
			var options = {}; // Any custom options you want to use would go here
			smoothScroll.animateScroll( null, window.location.hash, options );
		}
	</script>
	```


## Browser Compatibility

Smooth Scroll works in all modern browsers, and IE 9 and above.

Smooth Scroll is built with modern JavaScript APIs, and uses progressive enhancement. If the JavaScript file fails to load, or if your site is viewed on older and less capable browsers, anchor links will jump the way they normally would. If you need to smooth scrolling for older browsers, [download the jQuery version of Smooth Scroll on GitHub](https://github.com/cferdinandi/smooth-scroll/tree/archive-v1).



## Known Issues

If the `<body>` element has been assigned a height of `100%`, Smooth Scroll is unable to properly calculate page distances and will not scroll to the right location. The `<body>` element can have a fixed, non-percentage based height (ex. `500px`), or a height of `auto`.



## Adding `[data-scroll]` attributes to the `wp_nav_menu()` in WordPress

Add this to your `functions.php` file:

```js
function YOURPREFIX_custom_nav_attributes ( $atts, $item, $args ) {
    $atts['data-scroll'] = 'true';
    return $atts;
}
add_filter( 'nav_menu_link_attributes', 'YOURPREFIX_custom_nav_attributes', 10, 3 );
```

**Source:** http://wordpress.stackexchange.com/questions/121123/how-to-add-a-data-attribute-to-a-wordpress-menu-item



## How to Contribute

In lieu of a formal style guide, take care to maintain the existing coding style. Please apply fixes to both the development and production code. Don't forget to update the version number, and when applicable, the documentation.



## License

The code is available under the [MIT License](LICENSE.md).