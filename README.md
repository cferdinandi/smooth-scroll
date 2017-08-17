# Smooth Scroll [![Build Status](https://travis-ci.org/cferdinandi/smooth-scroll.svg)](https://travis-ci.org/cferdinandi/smooth-scroll)
A lightweight script to animate scrolling to anchor links. Smooth Scroll works great with [Gumshoe](https://github.com/cferdinandi/gumshoe).

[Download Smooth Scroll](https://github.com/cferdinandi/smooth-scroll/archive/master.zip) / [View the demo](http://cferdinandi.github.io/smooth-scroll/)


<hr>

### Want to learn how to write your own vanilla JS plugins? Check out my [Vanilla JS Pocket Guides series](https://gomakethings.com/guides/) and level-up as a web developer. 🚀

<hr>



## Getting Started

Compiled and production-ready code can be found in the `dist` directory. The `src` directory contains development code.

### 1. Include Smooth Scroll on your site.

There are two versions of Smooth Scroll: the standalone version, and one that comes preloaded with polyfills for the `closest()` and `requestAnimationFrame()` methods, which are only supported in newer browsers.

If you're including your own polyfills or don't want to enable this feature for older browsers, use the standalone version. Otherwise, use the version with polyfills.

```html
<script src="dist/js/smooth-scroll.js"></script>
```

### 2. Add the markup to your HTML.

No special markup needed&mdash;just standard anchor links. Give the anchor location an ID just like you normally would.

```html
<a data-scroll href="#bazinga">Anchor Link</a>
...
<div id="bazinga">Bazinga!</div>
```

***Note:*** *Smooth Scroll does not work with `<a name="anchor"></a>` style anchors. It requires IDs.*

### 3. Initialize Smooth Scroll.

In the footer of your page, after the content, initialize Smooth Scroll by passing in a selector for the anchor links that should be animated. And that's it, you're done. Nice work!

```html
<script>
	var scroll = new SmoothScroll('a[href*="#"]');
</script>
```

***Note:*** *The `a[href*="#"]` selector will apply Smooth Scroll to all anchor links. You can selectively target links using any other selector(s) you'd like. Smooth Scroll accepts multiple selectors as a comma separated list. Example: `'.js-scroll, [data-scroll], #some-link'`.*



## Installing with Package Managers

You can install Smooth Scroll with your favorite package manager or module loader directly from  NPM.

```
npm install smooth-scroll
```



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
var scroll = new SmoothScroll('a[href*="#"]', {
	// Selectors
	ignore: '[data-scroll-ignore]', // Selector for links to ignore (must be a valid CSS selector)
	header: null, // Selector for fixed headers (must be a valid CSS selector)

	// Speed & Easing
	speed: 500, // Integer. How fast to complete the scroll in milliseconds
	offset: 0, // Integer or Function returning an integer. How far to offset the scrolling anchor location in pixels
	easing: 'easeInOutCubic', // Easing pattern to use
	customEasing: function (time) {}, // Function. Custom easing pattern

	// Callback API
	before: function () {}, // Callback to run before scroll
	after: function () {} // Callback to run after scroll
});
```

#### Easing Options

Some common easing patterns are included by default, but you can also pass in your own custom easing pattern using the `customEasing` option noted above.

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

### Use Smooth Scroll events in your own scripts

You can also call Smooth Scroll's methods in your own scripts.

#### animateScroll()
Animate scrolling to an anchor.

```javascript
var scroll = new SmoothScroll();
scroll.animateScroll(
	anchor, // Node to scroll to. ex. document.querySelector( '#bazinga' )
	toggle, // Node that toggles the animation, OR an integer. ex. document.querySelector( '#toggle' )
	options // Classes and callbacks. Same options as those passed into the init() function.
);
```

**Example 1**

```javascript
var scroll = new SmoothScroll();
var anchor = document.querySelector( '#bazinga' );
scroll.animateScroll( anchor );
```

**Example 2**

```javascript
var scroll = new SmoothScroll();
var anchor = document.querySelector( '#bazinga' );
var toggle = document.querySelector('#toggle');
var options = { speed: 1000, easing: 'easeOutCubic' };
scroll.animateScroll( anchor, toggle, options );
```

**Example 3**

```javascript
// You can optionally pass in a y-position to scroll to as an integer
var scroll = new SmoothScroll();
scroll.animateScroll( 750 );
```

#### cancelScroll()
Cancel a scroll-in-progress.

```javascript
var scroll = new SmoothScroll();
scroll.cancelScroll();
```

***Note:*** *This does not handle focus management. The user will stop in place, and focus will remain on the anchor link that triggered the scroll.*

#### init()
Initialize Smooth Scroll. This is called automatically when you setup your `new SmoothScroll` object, but can be used to reinitialize your instance.

```javascript
var scroll = new SmoothScroll();
scroll.init('.some-selector');
```

#### destroy()
Destroy the current `smoothScroll.init()`. This is called automatically during the `init` function to remove any existing initializations.

```javascript
var scroll = new SmoothScroll();
scroll.destroy();
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
	var scroll = new SmoothScroll('.some-selector',{
		header: '[data-scroll-header]'
	});
</script>
```


## Migrating to Smooth Scroll 12 from Older Versions

### New Features

- You can now initialize multiple instances of Smooth Scroll with different selectors and options:
	```js
	var scrollFast = new SmoothScroll('.scroll-fast', {speed: 100});
	var scrollSlow = new SmoothScroll('.scroll-slow', {speed: 5000});
	```
- The new `cancelScroll()` method lets you programatically cancel a scroll-in-progress.
- Scrolling animation is now powered by `requestAnimationFrame()`, resulting in smoother scrolling and better performance.
- Smooth Scroll now supports Reduced Motion (currently a Safari-only feature). If the visitor has indicated that they [prefer reduced motion](https://css-tricks.com/smooth-scrolling-accessibility/), Smooth Scroll will jump to the anchor link as normal instead of animating the scroll.

### Breaking Changes

- You no longer initialize Smooth Scroll via `smoothScroll.init()`. You must now instantiate a new JavaScript object: `new SmoothScroll()`.
- There is no longer a default selector. You should pass in a selector as the first argument when setting up your constructor: `new SmoothScroll('.my-selector')`.
- The `data-options` feature has been deprecated, as the same effect can be achieved by initializing the plugin with different selectors.



## Browser Compatibility

Smooth Scroll works in all modern browsers, and IE 9 and above.

Smooth Scroll is built with modern JavaScript APIs, and uses progressive enhancement. If the JavaScript file fails to load, or if your site is viewed on older and less capable browsers, anchor links will jump the way they normally would.

### Polyfills

Support back to IE9 requires polyfills for the `closest()` and `requestAnimationFrame()` methods. Without them, support starts with Edge.

Use the included polyfills version of Smooth Scroll, or include your own.



## Known Issues

### `<body>` styling

If the `<body>` element has been assigned a height of `100%` or `overflow: hidden`, Smooth Scroll is unable to properly calculate page distances and will not scroll to the right location. The `<body>` element can have a fixed, non-percentage based height (ex. `500px`), or a height of `auto`, and an `overflow` of `visible`.

### Animating from the bottom

Animated scrolling links at the very bottom of the page (example: a "scroll to top" link) will stop animated almost immediately after they start when using certain easing patterns. This is an issue that's been around for a while and I've yet to find a good fix for it. I've found that `easeOut*` easing patterns work as expected, but other patterns can cause issues. [See this discussion for more details.](https://github.com/cferdinandi/smooth-scroll/issues/49)

### Styling with IDs

If you use an ID to style an element in your CSS, and that same element is targeted by an anchor link that you're scrolling to with Smooth Scroll, you will experience a temporary loss of styling.

Smooth Scroll temporarily removes the ID to prevent the page from jumping when the URL changes, and then adds it back. Use a class instead of an ID to avoid this issue.

```css
/* Instead of this */
#some-element {
	background-color: purple;
}

/* Do this */
.some-element {
	background-color: purple;
}
```



## Extras

Frequently asked questions, code snippets, and more to help you get the most out of Smooth Scroll.

### Scrolling to an anchor link on another page

This, unfortunately, cannot be done well.

Most browsers instantly jump you to the anchor location when you load a page. You could use `scrollTo(0, 0)` to pull users back up to the top, and then manually use the `animateScroll()` method, but in my experience, it results in a visible jump on the page that's a worse experience than the default browser behavior.

### Scrolling without updating the URL

Smooth Scroll is designed to progressively enhance anchor links while offloading as much to the browser as possible. In it's current implementation, it relies on `hashchange` events (which occur whenever a `#` changes in the URL) to trigger the scrolling behavior.

A benefit of this approach is that it preserves browser history and let's users navigate between anchors with the forward and back buttons on the browsers, just like you would normally.

*However*, I know certain front-end frameworks also use URL hashes for their own internal processes. While I view this as an anti-pattern, and won't bake hashless anchor links into Smooth Scroll's core, you can enable scrolling without updating the URL via the Smooth Scroll API.

Here's a relatively lightweight helper function that listens for click events and uses the `animateScroll()` method to scroll to the anchor. If you use this, you **should not** pass a selector into `new SmoothScroll()`.

```js
var scroll = new SmoothScroll();

var smoothScrollWithoutHash = function (selector, settings) {
	/**
	 * If smooth scroll element clicked, animate scroll
	 */
	var clickHandler = function (event) {
		var toggle = event.target.closest( selector );
		console.log(toggle);
		if ( !toggle || toggle.tagName.toLowerCase() !== 'a' ) return;
		console.log(toggle.hash);
		var anchor = document.querySelector( toggle.hash );
		if ( !anchor ) return;

		event.preventDefault(); // Prevent default click event
		scroll.animateScroll( anchor, toggle, settings || {} ); // Animate scroll
	};

	window.addEventListener('click', clickHandler, false );
};

// Run our function
smoothScrollWithoutHash( 'a[href*="#"]' );
```



## Support

Please review the [support guidelines](SUPPORT.md).



## License

The code is available under the [MIT License](LICENSE.md).