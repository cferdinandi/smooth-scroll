# Smooth Scroll [![Build Status](https://travis-ci.org/cferdinandi/smooth-scroll.svg)](https://travis-ci.org/cferdinandi/smooth-scroll)
A lightweight script to animate scrolling to anchor links. Smooth Scroll works great with [Gumshoe](https://github.com/cferdinandi/gumshoe).

[Download Smooth Scroll](https://github.com/cferdinandi/smooth-scroll/archive/master.zip) / [View the demo](http://cferdinandi.github.io/smooth-scroll/)


<hr>

### Want to learn how to write your own vanilla JS plugins? Check out ["The Vanilla JS Guidebook"](https://gomakethings.com/vanilla-js-guidebook/) and level-up as a web developer. 🚀

<hr>



## Getting Started

Compiled and production-ready code can be found in the `dist` directory. The `src` directory contains development code.

### 1. Include Smooth Scroll on your site.

```html
<script src="dist/js/smooth-scroll.js"></script>
```

### 2. Add the markup to your HTML.

Turn anchor links into Smooth Scroll links by adding the `[data-scroll]` data attribute. Give the anchor location an ID just like you normally would.

```html
<a data-scroll href="#bazinga">Anchor Link</a>
...
<span id="bazinga">Bazinga!</span>
```

### 3. Initialize Smooth Scroll.

In the footer of your page, after the content, initialize Smooth Scroll. And that's it, you're done. Nice work!

```html
<script>
	smoothScroll.init();
</script>
```



## Installing with Package Managers

You can install Smooth Scroll with your favorite package manager.

* **[NPM](https://www.npmjs.org/):** `npm install cferdinandi/smooth-scroll`
* **[Bower](http://bower.io/):** `bower install https://github.com/cferdinandi/smooth-scroll.git`
* **[Component](http://component.io/):** `component install cferdinandi/smooth-scroll`



## Working with the Source Files

If you would prefer, you can work with the development code in the `src` directory using the included [Gulp build system](http://gulpjs.com/). This compiles, lints, and minifies code.

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
	selector: '[data-scroll]', // Selector for links (must be a class, ID, data attribute, or element tag)
	selectorHeader: null, // Selector for fixed headers (must be a valid CSS selector) [optional]
	speed: 500, // Integer. How fast to complete the scroll in milliseconds
	easing: 'easeInOutCubic', // Easing pattern to use
	offset: 0, // Integer or Function returning an integer. How far to offset the scrolling anchor location in pixels
	callback: function ( anchor, toggle ) {} // Function to run after scrolling
});
```

***Note:*** *To programatically add Smooth Scroll to all anchor links on a page, pass `selector: 'a[href^="#"]'` into `init`.*

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

Smooth Scroll also lets you override global settings on a link-by-link basis using the `[data-options]` data attribute.

```html
<a data-scroll
   data-options='{
					"speed": 500,
					"easing": "easeInOutCubic",
					"offset": 0
				}'
>
	Anchor Link
</a>
```

***Note:*** *You must use [valid JSON](http://jsonlint.com/) in order for the `data-options` feature to work. Does not support the `callback` method.*

### Use Smooth Scroll events in your own scripts

You can also call Smooth Scroll's scroll animation events in your own scripts.

#### animateScroll()
Animate scrolling to an anchor.

```javascript
smoothScroll.animateScroll(
	anchor, // Node to scroll to. ex. document.querySelector( '#bazinga' )
	toggle, // Node that toggles the animation, OR an integer. ex. document.querySelector( '#toggle' )
	options // Classes and callbacks. Same options as those passed into the init() function.
);
```

**Example 1**

```javascript
var anchor = document.querySelector( '#bazinga' );
smoothScroll.animateScroll( anchor );
```

**Example 2**

```javascript
var anchor = document.querySelector( '#bazinga' );
var toggle = document.querySelector('#toggle');
var options = { speed: 1000, easing: 'easeOutCubic' };
smoothScroll.animateScroll( anchor, toggle, options );
```

**Example 3**

```javascript
// You can optionally pass in a y-position to scroll to as an integer
smoothScroll.animateScroll( 750 );
```

#### destroy()
Destroy the current `smoothScroll.init()`. This is called automatically during the `init` function to remove any existing initializations.

```javascript
smoothScroll.destroy();
```


### Fixed Headers

If you're using a fixed header, Smooth Scroll will automatically offset scroll distances by the header height. Pass in a valid CSS selector for your fixed header as an option to the `init`.

If you have multiple fixed headers, pass in the last one in the markup.

```html
<nav data-scroll-header>
	...
</nav>
...
<script>
	smoothScroll.init({
		selectorHeader: '[data-scroll-header]'
	});
</script>
```

### Animating links to other pages

This is an often requested feature, but Smooth Scroll does not include an option to animate scrolling to links on other pages.

You can attempt to implement it using the API, but it's very difficult to prevent the automatic browser jump when the page loads, and anything I've done to work around it results in weird, janky issues, so I've decided to leave this out of the core. Here's a potential workaround...

1. Do *not* add the `data-scroll` attribute to links to other pages. Treat them like normal links, and include your anchor link hash as normal.

    ```html
    <a href="some-page.html#example">
    ```
2. Add the following script to the footer of your page, after the `smoothScroll.init()` function.

    ```html
    <script>
        if ( window.location.hash ) {
        	var anchor = document.querySelector( window.location.hash ); // Get the anchor
        	var toggle = document.querySelector( 'a[href*="' + window.location.hash + '"]' ); // Get the toggle (if one exists)
            var options = {}; // Any custom options you want to use would go here
            smoothScroll.animateScroll( anchor, toggle, options );
        }
    </script>
    ```


## Browser Compatibility

Smooth Scroll works in all modern browsers, and IE 9 and above.

Smooth Scroll is built with modern JavaScript APIs, and uses progressive enhancement. If the JavaScript file fails to load, or if your site is viewed on older and less capable browsers, anchor links will jump the way they normally would.


## Known Issues

### `<body>` styling

If the `<body>` element has been assigned a height of `100%` or `overflow: hidden`, Smooth Scroll is unable to properly calculate page distances and will not scroll to the right location. The `<body>` element can have a fixed, non-percentage based height (ex. `500px`), or a height of `auto`, and an `overflow` of `visible`.

### Animating from the bottom

Animated scrolling links at the very bottom of the page (example: a "scroll to top" link) will stop animated almost immediately after they start when using certain easing patterns. This is an issue that's been around for a while and I've yet to find a good fix for it. I've found that `easeOut*` easing patterns work as expected, but other patterns can cause issues. [See this discussion for more details.](https://github.com/cferdinandi/smooth-scroll/issues/49)



## How to Contribute

Please review the  [contributing guidelines](CONTRIBUTING.md).



## License

The code is available under the [MIT License](LICENSE.md).