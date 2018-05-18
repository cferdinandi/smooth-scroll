# Smooth Scroll [![Build Status](https://travis-ci.org/cferdinandi/smooth-scroll.svg)](https://travis-ci.org/cferdinandi/smooth-scroll)
A lightweight script to animate scrolling to anchor links. Smooth Scroll works great with [Gumshoe](https://github.com/cferdinandi/gumshoe).

[Demo](http://cferdinandi.github.io/smooth-scroll/)


<hr>

### Want to learn how to write your own vanilla JS plugins? Check out my [Vanilla JS Pocket Guides](https://vanillajsguides.com/) or join the [Vanilla JS Academy](https://vanillajsacademy.com) and level-up as a web developer. 🚀

<hr>



## Getting Started

Compiled and production-ready code can be found in the `dist` directory. The `src` directory contains development code.

### 1. Include Smooth Scroll on your site.

There are two versions of Smooth Scroll: the standalone version, and one that comes preloaded with polyfills for `closest()`, `requestAnimationFrame()`, and `CustomEvent()`, which are only supported in newer browsers.

If you're including your own polyfills or don't want to enable this feature for older browsers, use the standalone version. Otherwise, use the version with polyfills.

**Direct Download**

You can [download the files directly from GitHub](https://github.com/cferdinandi/smooth-scroll/archive/master.zip).

```html
<script src="path/to/smooth-scroll.polyfills.min.js"></script>
```

**CDN**

You can also use the [jsDelivr CDN](https://cdn.jsdelivr.net/gh/cferdinandi/smooth-scroll/dist/). I recommend linking to a specific version number or version range to prevent major updates from breaking your site. Smooth Scroll uses semantic versioning.

```html
<!-- Always get the latest version -->
<!-- Not recommended for production sites! -->
<script src="https://cdn.jsdelivr.net/gh/cferdinandi/smooth-scroll/dist/smooth-scroll.polyfills.min.js"></script>

<!-- Get minor updates and patch fixes within a major version -->
<script src="https://cdn.jsdelivr.net/gh/cferdinandi/smooth-scroll@14/dist/smooth-scroll.polyfills.min.js"></script>

<!-- Get patch fixes within a minor version -->
<script src="https://cdn.jsdelivr.net/gh/cferdinandi/smooth-scroll@14.0/dist/smooth-scroll.polyfills.min.js"></script>

<!-- Get a specific version -->
<script src="https://cdn.jsdelivr.net/gh/cferdinandi/smooth-scroll@14.0.0/dist/smooth-scroll.polyfills.min.js"></script>
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


## ES6 Modules

Smooth Scroll does not have a default export, but does support CommonJS and can be used with native ES6 module imports.

```js
import('/path/to/smooth-scroll.polyfills.min.js')
	.then(function () {
		var scroll = new SmoothScroll('a[href*="#"]');
	});
```

It uses a UMD pattern, and should also work in most major module bundlers and package managers.



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
	topOnEmptyHash: true, // Scroll to the top of the page for links with href="#"

	// Speed & Easing
	speed: 500, // Integer. How fast to complete the scroll in milliseconds
	clip: true, // If true, adjust scroll distance to prevent abrupt stops near the bottom of the page
	offset: function (anchor, toggle) {

		// Integer or Function returning an integer. How far to offset the scrolling anchor location in pixels
		// This example is a function, but you could do something as simple as `offset: 25`

		// An example returning different values based on whether the clicked link was in the header nav or not
		if (toggle.classList.closest('.my-header-nav')) {
			return 25;
		} else {
			return 50;
		}

	},
	easing: 'easeInOutCubic', // Easing pattern to use
	customEasing: function (time) {

		// Function. Custom easing pattern
		// If this is set to anything other than null, will override the easing option above

		// return <your formulate with time as a multiplier>

		// Example: easeInOut Quad
		return time < 0.5 ? 2 * time * time : -1 + (4 - 2 * time) * time;

	},

	// History
	updateURL: true, // Update the URL on scroll
	popstate: true, // Animate scrolling with the forward/backward browser buttons (requires updateURL to be true)

	// Custom Events
	emitEvents: true // Emit custom events

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

### Custom Events

Smooth Scroll emits three custom events:

- `scrollStart` is emitted when the scrolling animation starts.
- `scrollStop` is emitted when the scrolling animation stops.
- `scrollCancel` is emitted if the scrolling animation is canceled.

All three events are emitted on the `document` element and bubble up. You can listen for them with the `addEventListener()` method. The `event.detail` object includes the `anchor` and `toggle` elements for the animation.

```js
// Log scroll events
var logScrollEvent = function (event) {

	// The event type
	console.log('type:', event.type);

	// The anchor element being scrolled to
	console.log('anchor:', event.detail.anchor);

	// The anchor link that triggered the scroll
	console.log('toggle:', event.detail.toggle);

};

// Listen for scroll events
document.addEventListener('scrollStart', logScrollEvent, false);
document.addEventListener('scrollStop', logScrollEvent, false);
document.addEventListener('scrollCancel', logScrollEvent, false);
```

### Use Smooth Scroll events in your own scripts

You can also call Smooth Scroll's methods in your own scripts.

#### animateScroll()
Animate scrolling to an anchor.

```javascript
var scroll = new SmoothScroll();
scroll.animateScroll(
	anchor, // Node to scroll to. ex. document.querySelector('#bazinga')
	toggle, // Node that toggles the animation, OR an integer. ex. document.querySelector('#toggle')
	options // Classes and callbacks. Same options as those passed into the init() function.
);
```

**Example 1**

```javascript
var scroll = new SmoothScroll();
var anchor = document.querySelector('#bazinga');
scroll.animateScroll(anchor);
```

**Example 2**

```javascript
var scroll = new SmoothScroll();
var anchor = document.querySelector('#bazinga');
var toggle = document.querySelector('#toggle');
var options = { speed: 1000, easing: 'easeOutCubic' };
scroll.animateScroll(anchor, toggle, options);
```

**Example 3**

```javascript
// You can optionally pass in a y-position to scroll to as an integer
var scroll = new SmoothScroll();
scroll.animateScroll(750);
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


## Migrating to Smooth Scroll 14 from Older Versions

### New Features

- You can now choose not to update the URL as a native feature. No more hacks using the API.
- You can choose not to scroll to top on `href="#"`, providing more flexibility for some CMS implementations.
- Custom events let you more easily hook into Smooth Scroll from other scripts.
- The feature test is scoped to a function, allowing for server-side implementations.
- The loss of styling with IDs experienced in earlier versions has been eliminated.
- The `anchor` and `toggle` elements are now passed into the `offset()` function, allowing for more customization [v14.1.0 and up].

### Breaking Changes

- Callback methods have been removed in favor of events.



## Browser Compatibility

Smooth Scroll works in all modern browsers, and IE 9 and above.

Smooth Scroll is built with modern JavaScript APIs, and uses progressive enhancement. If the JavaScript file fails to load, or if your site is viewed on older and less capable browsers, anchor links will jump the way they normally would.

### Polyfills

Support back to IE9 requires polyfills for `closest()`, `requestAnimationFrame()`, and `CustomEvent()`. Without them, support starts with Edge.

Use the included polyfills version of Smooth Scroll, or include your own.



## Known Issues

### `<body>` styling

If the `<body>` element has been assigned a height of `100%` or `overflow: hidden`, Smooth Scroll is unable to properly calculate page distances and will not scroll to the right location. The `<body>` element can have a fixed, non-percentage based height (ex. `500px`), or a height of `auto`, and an `overflow` of `visible`.

### Animating from the bottom

Animated scrolling links at the very bottom of the page (example: a "scroll to top" link) will stop animated almost immediately after they start when using certain easing patterns. This is an issue that's been around for a while and I've yet to find a good fix for it. I've found that `easeOut*` easing patterns work as expected, but other patterns can cause issues. [See this discussion for more details.](https://github.com/cferdinandi/smooth-scroll/issues/49)

### Scrolling to an anchor link on another page

This, unfortunately, cannot be done well.

Most browsers instantly jump you to the anchor location when you load a page. You could use `scrollTo(0, 0)` to pull users back up to the top, and then manually use the `animateScroll()` method, but in my experience, it results in a visible jump on the page that's a worse experience than the default browser behavior.



## License

The code is available under the [MIT License](LICENSE.md).