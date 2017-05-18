# Options and Settings

Smooth Scroll includes smart defaults and works right out of the box. But if you want to customize things, it also has a robust API that provides multiple ways for you to adjust the default options and settings.

<hr>

## Global Settings

You can pass options and callbacks into Smooth Scroll through the `init()` function:

```javascript
smoothScroll.init({
	// Selectors
	selector: '[data-scroll]', // Selector for links (must be a valid CSS selector)
	ignore: '[data-scroll-ignore]' // Selector to ignore (won't animate scrolling on links with this selector)
	selectorHeader: null, // Selector for fixed headers (must be a valid CSS selector) [optional]

	// Speed & Easing
	speed: 500, // Integer. How fast to complete the scroll in milliseconds
	offset: 0, // Integer or Function returning an integer. How far to offset the scrolling anchor location in pixels
	easing: 'easeInOutCubic', // Easing pattern to use

	// Custom easing patterns.
	// Must be an object with the easing name as the key
	// Each pattern must be a function, with `time` as the argument, that returns the pattern
	easingPatterns: {
	    myCustomEasingPattern: function (time) {
	        return time * (2 - time);
	    }
	}

	// Callback API
	before: function (anchor, toggle) {}, // Function to run before scrolling starts
	after: function (anchor, toggle) {} // Function to run after scrolling completes
});
```

<em markdown="1">**Note:** To programatically add Smooth Scroll to all anchor links on a page, pass `selector: 'a[href*="#"]'` into `init`.</em>

### Easing Options

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

<hr>


## Override settings with data attributes

Smooth Scroll also lets you override global settings on a link-by-link basis using the `[data-options]` data attribute.

```markup
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

***Note:*** *You must use [valid JSON](http://jsonlint.com/) in order for the `data-options` feature to work. Does not support the `before` and `after` callback methods, or the `easingPatterns` object.*

<hr>


## Use Smooth Scroll events in your own scripts

You can also call Smooth Scroll's scroll animation events in your own scripts.

### animateScroll()
Animate scrolling to an anchor.

```javascript
smoothScroll.animateScroll(
	anchor, // Node to scroll to, OR an integer. ex. document.querySelector( '#bazinga' )
	toggle, // Node that toggles the animation. ex. document.querySelector( '#toggle' )
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

### destroy()
Destroy the current `smoothScroll.init()`. This is called automatically during the `init` function to remove any existing initializations.

```javascript
smoothScroll.destroy();
```

<hr>


## Fixed Headers

If you're using a fixed header, Smooth Scroll will automatically offset scroll distances by the header height. Pass in a valid CSS selector for your fixed header as an option to the `init`.

If you have multiple fixed headers, pass in the last one in the markup.

```markup
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